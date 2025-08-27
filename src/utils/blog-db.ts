import { db } from '../db/index';
import { post, postTags, tag, location, travel, country, continent, plans } from '../db/schema';
import { eq, and, desc, sql, asc } from 'drizzle-orm';
import { getCollection, type CollectionEntry } from 'astro:content';

export interface BlogPostMetadata {
  id: number;
  title: string;
  startDate: string | null;
  endDate: string | null;
  createdAt: string;
  updatedAt: string | null;
  tags: string[];
  location: string | null;
  travelTitle: string | null;
  planTitle: string | null;
  countryName?: string; // Optional, only if needed for enriched posts
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
  return title.replace(/\s+/g, '_').replace(/[^\p{L}\p{N}_]/gu, '');
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

// Convert database travel title to normalized format
export function travelTitleToNormal(title: string): string {
  return title
    .replace(/_/g, ' ');
}

export async function getBlogPostByTitle(title: string, folderPath?: string): Promise<BlogPostMetadata | null> {
  try {
    const dbTitle = titleToDbFormat(title);
    // console.log(`Looking for post with title: ${dbTitle}`);

    // Get the post with its location and travel info
    const postResult = await db
      .select({
        id: post.id,
        title: post.title,
        startDate: post.startDate,
        endDate: post.endDate,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        locationName: location.name,
        travelId: post.travelId,
        planId: post.planId,
      })
      .from(post)
      .leftJoin(location, eq(post.locationId, location.id))
      .where(eq(post.title, dbTitle))
      .limit(1);

    if (postResult.length === 0) {
      // console.log(`No post found with title: ${dbTitle}`);
      return null;
    }

    const postData = postResult[0];
    // console.log(`Found post:`, postData);

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

    // Get plan information if planId exists
    let planTitle: string | null = null;
    if (postData.planId) {
      const planResult = await db
        .select({ title: plans.title })
        .from(plans)
        .where(eq(plans.id, postData.planId))
        .limit(1);

      if (planResult.length > 0) {
        planTitle = planResult[0].title;
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

    // console.log(`Found tags:`, tagsResult);

    return {
      id: postData.id,
      title: postData.title,
      startDate: postData.startDate,
      endDate: postData.endDate,
      createdAt: postData.createdAt,
      updatedAt: postData.updatedAt,
      tags: tagsResult.map(t => t.name),
      location: postData.locationName,
      travelTitle: travelTitle,
      planTitle: planTitle,
    };
  } catch (error) {
    console.error('Error fetching blog post metadata:', error);
    return null;
  }
}

export async function linkPostToTravel(postTitle: string, folderPath: string): Promise<boolean> {
  try {
    const dbPostTitle = titleToDbFormat(postTitle);
    const travelTitle = folderToTravelTitle(folderPath);

    // console.log(`Trying to link post ${dbPostTitle} to travel ${travelTitle}`);

    // Find the travel by title
    const travelResult = await db
      .select({ id: travel.id })
      .from(travel)
      .where(eq(travel.title, travelTitle))
      .limit(1);

    if (travelResult.length === 0) {
      // console.log(`Travel not found: ${travelTitle}`);
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

    // console.log(`Successfully linked post ${dbPostTitle} to travel ${travelTitle}`);
    return true;
  } catch (error) {
    console.error('Error linking post to travel:', error);
    return false;
  }
}

// Function to get database posts enriched with markdown frontmatter
export async function getEnrichedPostsForCountry(countryName: string): Promise<EnrichedBlogPost[]> {
  try {
    // Get all posts from the database for the specified country with proper joins, ordered by start date
    const dbPosts = await db
      .select({
        postId: post.id,
        postTitle: post.title,
        postStartDate: post.startDate,
        postEndDate: post.endDate,
        postCreatedAt: post.createdAt,
        locationName: location.name,
        countryName: country.name,
      })
      .from(post)
      .innerJoin(location, eq(post.locationId, location.id))
      .innerJoin(country, eq(location.countryId, country.id))
      .where(eq(country.name, countryName))
      .orderBy(desc(sql`COALESCE(${post.startDate}, ${post.createdAt})`)) // Order by start_date DESC, fallback to created_at DESC
      .all();

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

      // Find matching markdown post
      const matchingMarkdown = markdownPosts.find(mdPost => {
        const slug = mdPost.id.split('/').pop()?.replace(/\.(md|mdx)$/, '') || '';
        // console.log(`Comparing slug: ${slug} with dbTitleFormatted: ${dbTitleFormatted}`);
        return slug === dbTitleFormatted;
      });

      // console.log(`Found matching markdown:`, matchingMarkdown ? 'Yes' : 'No');

      const enrichedPost: EnrichedBlogPost = {
        id: dbPost.postId,
        title: dbPost.postTitle,
        startDate: dbPost.postStartDate,
        endDate: dbPost.postEndDate,
        createdAt: dbPost.postCreatedAt,
        updatedAt: null,
        tags: [],
        location: dbPost.locationName,
        travelTitle: null,
        planTitle: null,
      };

      if (matchingMarkdown) {
        enrichedPost.markdownData = {
          description: matchingMarkdown.data.description,
          heroImage: matchingMarkdown.data.heroImage,
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

// Function to get entriched posts for a specific travel
export async function getEnrichedPostsForTravel(travelTitle: string): Promise<EnrichedBlogPost[]> {
  try {
    // Get all posts from the database for the specified travel with proper joins, ordered by start date
    const dbPosts = await db
      .select({
        postId: post.id,
        postTitle: post.title,
        postStartDate: post.startDate,
        postEndDate: post.endDate,
        postCreatedAt: post.createdAt,
        locationName: location.name,
        countryName: country.name,
      })
      .from(post)
      .innerJoin(location, eq(post.locationId, location.id))
      .innerJoin(country, eq(location.countryId, country.id))
      .innerJoin(travel, eq(post.travelId, travel.id))
      .where(eq(travel.title, travelTitle))
      .orderBy(desc(sql`COALESCE(${post.startDate}, ${post.createdAt})`)) // Order by start_date ASC, fallback to created_at ASC
      .all();

    // console.log(`Found ${dbPosts.length} posts for travel: ${travelTitle}`);

    const enrichedPosts: EnrichedBlogPost[] = [];

    // Get all markdown posts
    const markdownPosts = await getCollection('blog');

    for (const dbPost of dbPosts) {
      // Convert database title format to markdown filename format
      let dbTitleFormatted = dbPost.postTitle
        .toLowerCase()
        .replace(/_/g, '-')
        .normalize('NFD') // Decompose accented characters
        .replace(/[\u0300-\u036f]/g, '') // Remove diacritical marks
        .replace(/[^a-z0-9-]/g, '-') // Replace non-alphanumeric chars with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
        .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens

      // Find matching markdown post
      const matchingMarkdown = markdownPosts.find(mdPost => {
        const slug = mdPost.id.split('/').pop()?.replace(/\.(md|mdx)$/, '') || '';
        return slug === dbTitleFormatted;
      });

      const enrichedPost: EnrichedBlogPost = {
        id: dbPost.postId,
        title: dbPost.postTitle,
        startDate: dbPost.postStartDate,
        endDate: dbPost.postEndDate,
        createdAt: dbPost.postCreatedAt,
        updatedAt: null,
        tags: [],
        location: dbPost.locationName,
        travelTitle: travelTitle,
        planTitle: null,
        countryName: dbPost.countryName,
      };

      if (matchingMarkdown) {
        enrichedPost.markdownData = {
          description: matchingMarkdown.data.description,
          heroImage: matchingMarkdown.data.heroImage,
          pubDate: matchingMarkdown.data.pubDate,
          slug: matchingMarkdown.id,
          url: `/blog/${matchingMarkdown.id.replace(/\.(md|mdx)$/, '')}`
        };
      }

      enrichedPosts.push(enrichedPost);
    }

    return enrichedPosts;
  } catch (error) {
    console.error('Error fetching enriched blog posts for travel:', error);
    return [];
  }
}

export async function getEnrichedPostsForPlan(planTitle: string): Promise<EnrichedBlogPost[]> {
  try {
    // Get all posts from the database for the specified plan with proper joins, ordered by start date
    const dbPosts = await db
      .select({
        postId: post.id,
        postTitle: post.title,
        postStartDate: post.startDate,
        postEndDate: post.endDate,
        postCreatedAt: post.createdAt,
        locationName: location.name,
        countryName: country.name,
      })
      .from(post)
      .innerJoin(location, eq(post.locationId, location.id))
      .innerJoin(country, eq(location.countryId, country.id))
      .innerJoin(plans, eq(post.planId, plans.id))
      .where(eq(plans.title, planTitle))
      .orderBy(asc(post.createdAt))  // Order by just created date
      .all();

    const enrichedPosts: EnrichedBlogPost[] = [];

    // Get all markdown posts
    const markdownPosts = await getCollection('blog');

    for (const dbPost of dbPosts) {
      // Convert database title format to markdown filename format
      let dbTitleFormatted = dbPost.postTitle
        .toLowerCase()
        .replace(/_/g, '-')
        .normalize('NFD') // Decompose accented characters
        .replace(/[\u0300-\u036f]/g, '') // Remove diacritical marks
        .replace(/[^a-z0-9-]/g, '-') // Replace non-alphanumeric chars with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
        .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens

      // Find matching markdown post
      const matchingMarkdown = markdownPosts.find(mdPost => {
        const slug = mdPost.id.split('/').pop()?.replace(/\.(md|mdx)$/, '') || '';
        return slug === dbTitleFormatted;
      });

      const enrichedPost: EnrichedBlogPost = {
        id: dbPost.postId,
        title: dbPost.postTitle,
        startDate: dbPost.postStartDate,
        endDate: dbPost.postEndDate,
        createdAt: dbPost.postCreatedAt,
        updatedAt: null,
        tags: [],
        location: dbPost.locationName,
        travelTitle: null,
        planTitle: planTitle,
        countryName: dbPost.countryName,
      };

      if (matchingMarkdown) {
        enrichedPost.markdownData = {
          description: matchingMarkdown.data.description,
          heroImage: matchingMarkdown.data.heroImage,
          pubDate: matchingMarkdown.data.pubDate,
          slug: matchingMarkdown.id,
          url: `/blog/${matchingMarkdown.id.replace(/\.(md|mdx)$/, '')}`
        };
      }

      enrichedPosts.push(enrichedPost);
    }

    return enrichedPosts;

  } catch (error) {
    console.error('Error fetching enriched posts for plan:', error);
    return [];
  }
}

// Function to get number of enriched posts
export async function getNumberOfEnrichedPosts(number: number): Promise<EnrichedBlogPost[]> {
  try {
    // Get the latest 'number' of posts from the database
    const dbPosts = await db
      .select({
        postId: post.id,
        postTitle: post.title,
        postStartDate: post.startDate,
        postEndDate: post.endDate,
        postCreatedAt: post.createdAt,
        locationName: location.name,
      })
      .from(post)
      .innerJoin(location, eq(post.locationId, location.id))
      .innerJoin(travel, eq(post.travelId, travel.id))
      .orderBy(desc(sql`COALESCE(${post.startDate}, ${post.createdAt})`)) // Order by start_date DESC, fallback to created_at DESC
      .limit(number)
      .all();

    // Get all markdown posts
    const markdownPosts = await getCollection('blog');

    // Enrich posts with markdown data
    const enrichedPosts: EnrichedBlogPost[] = dbPosts.map(dbPost => {
      const matchingMarkdown = markdownPosts.find(mdPost => {
        const slug = mdPost.id.split('/').pop()?.replace(/\.(md|mdx)$/, '') || '';
        const dbTitleNormalized = dbPost.postTitle
          .toLowerCase()
          .replace(/_/g, '-')
          .replace(/\s+/g, '-')
          .normalize('NFD') // Decompose accented characters
          .replace(/[\u0300-\u036f]/g, ''); // Remove diacritical marks
        return slug === dbTitleNormalized;
      });

      const enrichedPost: EnrichedBlogPost = {
        id: dbPost.postId,
        title: dbPost.postTitle,
        startDate: dbPost.postStartDate,
        endDate: dbPost.postEndDate,
        createdAt: dbPost.postCreatedAt,
        updatedAt: null,
        tags: [],
        location: dbPost.locationName,
        travelTitle: null,
        planTitle: null,
      };

      if (matchingMarkdown) {
        enrichedPost.markdownData = {
          description: matchingMarkdown.data.description,
          heroImage: matchingMarkdown.data.heroImage,
          pubDate: matchingMarkdown.data.pubDate,
          slug: matchingMarkdown.id,
          url: `/blog/${matchingMarkdown.id.replace(/\.(md|mdx)$/, '')}`
        };
      }

      return enrichedPost;
    });

    return enrichedPosts;
  } catch (error) {
    console.error('Error fetching number of enriched posts:', error);
    return [];
  }
}

// Interface for posts with coordinates for map display
export interface PostWithCoordinates {
  id: number;
  title: string;
  startDate: string | null;
  endDate: string | null;
  locationName: string;
  countryName: string;
  latitude: string | null;
  longitude: string | null;
  url: string;
  tags: string[];
  description: string;
}

export async function getPostsWithCoordinates(): Promise<PostWithCoordinates[]> {
  try {
    const postsWithCoords = await db
      .select({
        id: post.id,
        title: post.title,
        startDate: post.startDate,
        endDate: post.endDate,
        locationName: location.name,
        countryName: country.name,
        latitude: location.latitude,
        longitude: location.longitude,
      })
      .from(post)
      .innerJoin(location, eq(post.locationId, location.id))
      .innerJoin(country, eq(location.countryId, country.id))
      .innerJoin(travel, eq(post.travelId, travel.id)) // Ensure posts have a travel association
      .orderBy(desc(post.createdAt));

    // Get all markdown posts to match with database posts
    const markdownPosts = await getCollection('blog');

    // Get tags for all posts
    const allTags = await db
      .select({
        postId: postTags.postId,
        tagName: tag.name,
      })
      .from(postTags)
      .innerJoin(tag, eq(postTags.tagId, tag.id));

    return await Promise.all(postsWithCoords.map(async p => {
      // Convert database title format to markdown filename format for matching
      const normalizedTitle = p.title
        .toLowerCase()
        .replace(/_/g, '-')
        .normalize('NFD') // Decompose accented characters
        .replace(/[\u0300-\u036f]/g, '') // Remove diacritical marks
        .replace(/[^a-z0-9-]/g, '-') // Replace non-alphanumeric chars with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
        .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens

      // Find matching markdown post by comparing the slug (filename part)
      const matchingMarkdown = markdownPosts.find(mdPost => {
        const slug = mdPost.id.split('/').pop()?.replace(/\.(md|mdx)$/, '') || '';
        return slug === normalizedTitle;
      });

      // Use the full markdown path if found, otherwise fallback to simple path
      const url = matchingMarkdown
        ? `/blog/${matchingMarkdown.id.replace(/\.(md|mdx)$/, '')}`
        : `/blog/${normalizedTitle}`;

      // Get tags for this post
      const postTagsList = allTags
        .filter(tagData => tagData.postId === p.id)
        .map(tagData => tagData.tagName);

      // Get description from markdown frontmatter
      const description = matchingMarkdown?.data?.description || 'Explore this travel story';

      return {
        ...p,
        url,
        tags: postTagsList,
        description
      };
    }));
  } catch (error) {
    console.error('Error fetching posts with coordinates:', error);
    return [];
  }
}

// Function to get all published posts that are NOT plans (plan_id is null)
export async function getNonPlanPosts(): Promise<{ title: string; url: string }[]> {
  try {
    // Get all posts from the database where plan_id is null (not part of a plan)
    const dbPosts = await db
      .select({
        postTitle: post.title,
      })
      .from(post)
      .innerJoin(travel, eq(post.travelId, travel.id)) // Only posts with travel association
      .where(
        and(
          sql`${post.planId} IS NULL`, // Exclude posts that are part of plans
          eq(post.isPublished, 1) // Only published posts
        )
      )
      .orderBy(desc(post.createdAt))
      .all();

    // Get all markdown posts to match with database posts
    const markdownPosts = await getCollection('blog');

    // Convert database posts to URLs
    return dbPosts.map(dbPost => {
      // Convert database title format to markdown filename format for matching
      const normalizedTitle = dbPost.postTitle
        .toLowerCase()
        .replace(/_/g, '-')
        .normalize('NFD') // Decompose accented characters
        .replace(/[\u0300-\u036f]/g, '') // Remove diacritical marks
        .replace(/[^a-z0-9-]/g, '-') // Replace non-alphanumeric chars with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
        .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens

      // Find matching markdown post by comparing the slug (filename part)
      const matchingMarkdown = markdownPosts.find(mdPost => {
        const slug = mdPost.id.split('/').pop()?.replace(/\.(md|mdx)$/, '') || '';
        return slug === normalizedTitle;
      });

      // Use the full markdown path if found
      const url = matchingMarkdown
        ? `/blog/${matchingMarkdown.id.replace(/\.(md|mdx)$/, '')}`
        : `/blog/${normalizedTitle}`;

      return {
        title: dbPost.postTitle,
        url
      };
    });
  } catch (error) {
    console.error('Error fetching non-plan posts:', error);
    return [];
  }
}
