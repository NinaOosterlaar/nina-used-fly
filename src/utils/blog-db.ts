import { db } from '../db/index';
import { post, postTags, tag, location, travel, country, continent } from '../db/schema';
import { eq, and } from 'drizzle-orm';
import { getCollection, type CollectionEntry } from 'astro:content';

export interface BlogPostMetadata {
  id: number;
  title: string;
  startDate: string | null;
  endDate: string | null;
  createdAt: string;
  updatedAt: string | null;
  isPublished: boolean;
  tags: string[];
  location: string | null;
  travelTitle: string | null;
}

export interface EnrichedBlogPost extends BlogPostMetadata {
  markdownData?: {
    description: string;
    heroImage?: string;
    pubDate: Date;
    slug: string;
    url: string;
  };
}

// Convert blog post title to database format
function titleToDbFormat(title: string): string {
  return title.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '');
}

// Convert folder path to travel title
function folderToTravelTitle(path: string): string {
  // Extract folder name from path like "musical-trip-to-belgium"
  const folderName = path.split('/').pop() || '';
  // Convert to database format: "Musical_Trip_To_Belgium"
  return folderName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('_');
}

export async function getBlogPostByTitle(title: string, folderPath?: string): Promise<BlogPostMetadata | null> {
  try {
    const dbTitle = titleToDbFormat(title);
    console.log(`Looking for post with title: ${dbTitle}`);
    
    // Get the post with its location and travel info
    const postResult = await db
      .select({
        id: post.id,
        title: post.title,
        startDate: post.startDate,
        endDate: post.endDate,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        isPublished: post.isPublished,
        locationName: location.name,
        travelId: post.travelId,
      })
      .from(post)
      .leftJoin(location, eq(post.locationId, location.id))
      .where(eq(post.title, dbTitle))
      .limit(1);

    if (postResult.length === 0) {
      console.log(`No post found with title: ${dbTitle}`);
      return null;
    }

    const postData = postResult[0];
    console.log(`Found post:`, postData);

    // Get travel information if travelId exists
    let travelTitle: string | null = null;
    if (postData.travelId) {
      const travelResult = await db
        .select({ title: travel.title })
        .from(travel)
        .where(eq(travel.id, postData.travelId))
        .limit(1);
      
      if (travelResult.length > 0) {
        travelTitle = travelResult[0].title;
      }
    }

    // Get the tags for this post
    const tagsResult = await db
      .select({
        name: tag.name,
      })
      .from(postTags)
      .innerJoin(tag, eq(postTags.tagId, tag.id))
      .where(eq(postTags.postId, postData.id));

    console.log(`Found tags:`, tagsResult);

    return {
      id: postData.id,
      title: postData.title,
      startDate: postData.startDate,
      endDate: postData.endDate,
      createdAt: postData.createdAt,
      updatedAt: postData.updatedAt,
      isPublished: Boolean(postData.isPublished),
      tags: tagsResult.map(t => t.name),
      location: postData.locationName,
      travelTitle: travelTitle,
    };
  } catch (error) {
    console.error('Error fetching blog post metadata:', error);
    return null;
  }
}

export async function markPostAsPublished(title: string): Promise<boolean> {
  try {
    const dbTitle = titleToDbFormat(title);
    
    const result = await db
      .update(post)
      .set({ 
        isPublished: 1,
        updatedAt: new Date().toISOString()
      })
      .where(eq(post.title, dbTitle));

    console.log(`Marked post ${dbTitle} as published`);
    return true;
  } catch (error) {
    console.error('Error marking post as published:', error);
    return false;
  }
}

export async function linkPostToTravel(postTitle: string, folderPath: string): Promise<boolean> {
  try {
    const dbPostTitle = titleToDbFormat(postTitle);
    const travelTitle = folderToTravelTitle(folderPath);
    
    console.log(`Trying to link post ${dbPostTitle} to travel ${travelTitle}`);
    
    // Find the travel by title
    const travelResult = await db
      .select({ id: travel.id })
      .from(travel)
      .where(eq(travel.title, travelTitle))
      .limit(1);
    
    if (travelResult.length === 0) {
      console.log(`Travel not found: ${travelTitle}`);
      return false;
    }
    
    const travelId = travelResult[0].id;
    
    // Update the post to link it to the travel
    await db
      .update(post)
      .set({ 
        travelId: travelId,
        updatedAt: new Date().toISOString()
      })
      .where(eq(post.title, dbPostTitle));
    
    console.log(`Successfully linked post ${dbPostTitle} to travel ${travelTitle}`);
    return true;
  } catch (error) {
    console.error('Error linking post to travel:', error);
    return false;
  }
}

// Function to get database posts enriched with markdown frontmatter
export async function getEnrichedPostsForCountry(countryName: string): Promise<EnrichedBlogPost[]> {
  try {
    // Get all posts from the database for the specified country with proper joins
    const dbPosts = await db
      .select({
        postId: post.id,
        postTitle: post.title,
        postStartDate: post.startDate,
        postEndDate: post.endDate,
        postCreatedAt: post.createdAt,
        postIsPublished: post.isPublished,
        locationName: location.name,
        countryName: country.name,
      })
      .from(post)
      .innerJoin(location, eq(post.locationId, location.id))
      .innerJoin(country, eq(location.countryId, country.id))
      .where(eq(country.name, countryName))
      .all();

    console.log(`Found ${dbPosts.length} posts for ${countryName}:`, dbPosts);

    // Get all markdown posts
    const markdownPosts = await getCollection('blog');
    
    // Create a mapping function to match database titles to markdown files
    const enrichedPosts: EnrichedBlogPost[] = [];
    
    for (const dbPost of dbPosts) {
      // Convert database title format to markdown filename format
      // Handle special characters and normalize them
      let dbTitleFormatted = dbPost.postTitle
        .toLowerCase()
        .replace(/_/g, '-')
        .normalize('NFD') // Decompose accented characters
        .replace(/[\u0300-\u036f]/g, '') // Remove diacritical marks
        .replace(/[^a-z0-9-]/g, '-') // Replace non-alphanumeric chars with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
        .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
      
      console.log(`Looking for markdown file matching: ${dbTitleFormatted}`);
      
      // Find matching markdown post
      const matchingMarkdown = markdownPosts.find(mdPost => {
        const slug = mdPost.id.split('/').pop()?.replace(/\.(md|mdx)$/, '') || '';
        console.log(`  Checking against slug: ${slug}`);
        return slug === dbTitleFormatted;
      });
      
      console.log(`Found matching markdown:`, matchingMarkdown ? 'Yes' : 'No');
      
      const enrichedPost: EnrichedBlogPost = {
        id: dbPost.postId,
        title: dbPost.postTitle,
        startDate: dbPost.postStartDate,
        endDate: dbPost.postEndDate,
        createdAt: dbPost.postCreatedAt,
        updatedAt: null,
        isPublished: Boolean(dbPost.postIsPublished),
        tags: [],
        location: dbPost.locationName,
        travelTitle: null,
      };
      
      if (matchingMarkdown) {
        enrichedPost.markdownData = {
          description: matchingMarkdown.data.description,
          heroImage: matchingMarkdown.data.heroImage?.src,
          pubDate: matchingMarkdown.data.pubDate,
          slug: matchingMarkdown.id,
          url: `/blog/${matchingMarkdown.id.replace(/\.(md|mdx)$/, '')}`
        };
      }
      
      enrichedPosts.push(enrichedPost);
    }
    
    return enrichedPosts;
  } catch (error) {
    console.error('Error fetching enriched blog posts:', error);
    return [];
  }
}
