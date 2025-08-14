import type { APIRoute } from 'astro';
import { db } from '../../db/index';
import { email } from '../../db/schema';
import { eq } from 'drizzle-orm';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const emailAddress = body.email;

    // Validate email
    if (!emailAddress || !emailAddress.includes('@')) {
      return new Response(JSON.stringify({ 
        success: false, 
        message: 'Please enter a valid email address' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Check if email already exists
    const existingEmail = await db.select()
      .from(email)
      .where(eq(email.email, emailAddress));

    if (existingEmail.length > 0) {
      return new Response(JSON.stringify({ 
        success: false, 
        message: 'This email is already subscribed!' 
      }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Insert new email
    await db.insert(email).values({
      email: emailAddress,
      created_at: new Date().toISOString()
    });

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Thank you for subscribing! 🎉' 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Subscription error:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      message: 'Something went wrong. Please try again later.' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
