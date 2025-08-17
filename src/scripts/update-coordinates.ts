import { db } from '../db/index.js';
import { location } from '../db/schema.js';
import { locationCoordinates } from '../utils/coordinates.js';
import { eq } from 'drizzle-orm';

async function updateLocationCoordinates() {
  console.log('Starting coordinate update for locations...');
  
  try {
    // Get all locations from database
    const locations = await db.select().from(location);
    console.log(`Found ${locations.length} locations to update`);
    
    let updatedCount = 0;
    let skippedCount = 0;
    
    for (const loc of locations) {
      const coordinates = locationCoordinates[loc.name];
      
      if (coordinates) {
        // Update the location with coordinates
        await db
          .update(location)
          .set({
            latitude: coordinates.lat.toString(),
            longitude: coordinates.lng.toString()
          })
          .where(eq(location.id, loc.id));
        
        console.log(`✅ Updated ${loc.name}: ${coordinates.lat}, ${coordinates.lng}`);
        updatedCount++;
      } else {
        console.log(`⚠️  No coordinates found for: ${loc.name}`);
        skippedCount++;
      }
    }
    
    console.log(`\n📊 Update complete!`);
    console.log(`   Updated: ${updatedCount} locations`);
    console.log(`   Skipped: ${skippedCount} locations`);
    
  } catch (error) {
    console.error('Error updating coordinates:', error);
  }
}

// Run the update
updateLocationCoordinates();
