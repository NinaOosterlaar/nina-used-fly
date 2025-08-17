import { db } from '../db/index';
import { post, postTags, tag, location, travel, country, continent, plans } from '../db/schema';
import { eq, and, desc, sql } from 'drizzle-orm';
import { getCollection, type CollectionEntry } from 'astro:content';

// Normalize text for search - removes accents and special characters
function normalizeSearchText(text: string): string {
  return text
    .normalize('NFD') // Decompose accented characters
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritical marks
    .toLowerCase();
}

// Get all blog posts from the database with their complete metadata
export async function getAllBlogPostsFromDB() {
  try {
    const dbPosts = await db
      .select({
        postId: post.id,
        postTitle: post.title,
        postTravelId: post.travelId,
        postPlanId: post.planId,
        locationId: location.id,
        locationName: location.name,
        countryId: country.id,
        countryName: country.name,
        continentId: continent.id,
        continentName: continent.name,
        travelTitle: travel.title,
        planTitle: plans.title,
      })
      .from(post)
      .innerJoin(location, eq(post.locationId, location.id))
      .innerJoin(country, eq(location.countryId, country.id))
      .innerJoin(continent, eq(country.continentId, continent.id))
      .leftJoin(travel, eq(post.travelId, travel.id)) // leftJoin because travel is optional
      .leftJoin(plans, eq(post.planId, plans.id))     // leftJoin because plan is optional
      .orderBy(desc(sql`COALESCE(${post.startDate}, ${post.createdAt})`))
      .all();

    return dbPosts;
  } catch (error) {
    console.error('Error fetching blog posts from database:', error);
    return [];
  }
}

// Get all blog posts from markdown collection
export async function getAllBlogPosts(): Promise<CollectionEntry<'blog'>[]> {
  const collection = await getCollection('blog');
  return collection;
}

// Get all blog posts from database with tags included
export async function getAllBlogPostsWithTags() {
  try {
    // Get all posts with location/country/continent/travel/plan data
    const dbPosts = await getAllBlogPostsFromDB();
    
    // Get all markdown posts for enrichment
    const markdownPosts = await getCollection('blog');
    
    // Get all tags for all posts in one query
    const allPostTags = await db
      .select({
        postId: postTags.postId,
        tagName: tag.name,
      })
      .from(postTags)
      .innerJoin(tag, eq(postTags.tagId, tag.id))
      .all();

    // Create map for efficient tag lookups
    const tagsByPostId = new Map<number, string[]>();
    allPostTags.forEach(pt => {
      if (!tagsByPostId.has(pt.postId)) {
        tagsByPostId.set(pt.postId, []);
      }
      tagsByPostId.get(pt.postId)!.push(pt.tagName);
    });

    // Combine posts with their tags and markdown data
    const postsWithTags = dbPosts.map(post => {
      // Find matching markdown post
      const dbTitleFormatted = post.postTitle
        .toLowerCase()
        .replace(/_/g, '-')
        .normalize('NFD') // Decompose accented characters
        .replace(/[\u0300-\u036f]/g, '') // Remove diacritical marks
        .replace(/[^a-z0-9-]/g, '-') // Replace non-alphanumeric chars with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
        .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
      
      const matchingMarkdown = markdownPosts.find(mdPost => {
        const slug = mdPost.id.split('/').pop()?.replace(/\.(md|mdx)$/, '') || '';
        return slug === dbTitleFormatted;
      });

      return {
        ...post,
        tags: tagsByPostId.get(post.postId) || [],
        // Add markdown data with proper URL
        markdownData: matchingMarkdown ? {
          description: matchingMarkdown.data.description,
          heroImage: matchingMarkdown.data.heroImage,
          pubDate: matchingMarkdown.data.pubDate,
          slug: matchingMarkdown.id,
          url: `/blog/${matchingMarkdown.id.replace(/\.(md|mdx)$/, '')}`
        } : undefined,
        // Create searchable text combining all relevant fields
        searchableText: normalizeSearchText([
          post.postTitle.replace(/_/g, ' '),
          post.locationName,
          post.countryName,
          post.continentName,
          post.travelTitle?.replace(/_/g, ' '),
          post.planTitle?.replace(/_/g, ' '),
          ...(tagsByPostId.get(post.postId) || [])
        ]
          .filter(Boolean)
          .join(' ')),
      };
    });

    return postsWithTags;
  } catch (error) {
    console.error('Error fetching blog posts with tags:', error);
    return [];
  }
}

// Search function that handles accented characters
export function searchPosts(posts: Awaited<ReturnType<typeof getAllBlogPostsWithTags>>, query: string) {
  if (!query.trim()) return posts;
  
  const normalizedQuery = normalizeSearchText(query.trim());
  
  return posts.filter(post => 
    post.searchableText.includes(normalizedQuery)
  );
}

// Filter posts by various criteria
export function filterPosts(posts: Awaited<ReturnType<typeof getAllBlogPostsWithTags>>, filters: {
  query?: string;
  country?: string;
  continent?: string;
  tags?: string[];
}) {
  let filteredPosts = posts;
  
  // Text search with accent normalization
  if (filters.query) {
    filteredPosts = searchPosts(filteredPosts, filters.query);
  }
  
  // Country filter
  if (filters.country) {
    filteredPosts = filteredPosts.filter(post => post.countryName === filters.country);
  }
  
  // Continent filter  
  if (filters.continent) {
    filteredPosts = filteredPosts.filter(post => post.continentName === filters.continent);
  }
  
  // Tags filter (post must have all specified tags)
  if (filters.tags && filters.tags.length > 0) {
    filteredPosts = filteredPosts.filter(post =>
      filters.tags!.every(filterTag =>
        post.tags.some(postTag => 
          normalizeSearchText(postTag) === normalizeSearchText(filterTag)
        )
      )
    );
  }
  
  return filteredPosts;
}