import type { APIRoute } from 'astro';
import { db } from '../../db';
import { continent, country } from '../../db/schema';

export const GET: APIRoute = async () => {
  try {
    // Get all continents with their countries
    const continents = await db.select().from(continent);
    
    return new Response(JSON.stringify(continents), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch continents' }), {
      status: 500,
    });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const { name } = await request.json();
    
    // Insert a new continent
    const newContinent = await db.insert(continent).values({
      name,
    }).returning();
    
    return new Response(JSON.stringify(newContinent[0]), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to create continent' }), {
      status: 500,
    });
  }
};
