import { db } from '../db/index';
import { post, location, country } from '../db/schema';
import { eq } from 'drizzle-orm';

export interface PostLocation {
  id: number;
  title: string;
  postUrl: string;
  location: {
    name: string;
    country: string;
    lat: number;
    lng: number;
  };
}

export async function getPostsWithLocations(): Promise<PostLocation[]> {
  try {
    const postsWithLocations = await db
      .select({
        postId: post.id,
        postTitle: post.title,
        locationName: location.name,
        latitude: location.latitude,
        longitude: location.longitude,
        countryName: country.name,
      })
      .from(post)
      .innerJoin(location, eq(post.locationId, location.id))
      .innerJoin(country, eq(location.countryId, country.id))
      .where(eq(post.isPublished, 1));

    return postsWithLocations
      .filter(p => p.latitude && p.longitude) // Only include locations with coordinates
      .map(p => ({
        id: p.postId,
        title: p.postTitle.replace(/_/g, ' '),
        postUrl: `/blog/${p.postTitle.toLowerCase().replace(/_/g, '-')}`,
        location: {
          name: p.locationName,
          country: p.countryName,
          lat: parseFloat(p.latitude!),
          lng: parseFloat(p.longitude!),
        },
      }));
  } catch (error) {
    console.error('Error fetching posts with locations:', error);
    return [];
  }
}
