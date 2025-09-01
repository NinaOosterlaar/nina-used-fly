// Tag configurations - update descriptions here and they'll appear on tag pages
export const tagConfig: Record<string, {
  description: string;
}> = {
  'Adventure': {
    description: 'Thrilling experiences and exciting journeys off the beaten path.'
  },
  'Architecture': {
    description: 'Stunning buildings, monuments, and architectural wonders.'
  },
  'Art': {
    description: 'Museums, galleries, street art, and artistic experiences.'
  },
  'Beaches': {
    description: 'Coastal adventures, seaside relaxation, and beach activities.'
  },
  'Camping': {
    description: 'Outdoor camping experiences and wilderness adventures.'
  },
  'Culture': {
    description: 'Local traditions, customs, and cultural immersion experiences.'
  },
  'Cycling': {
    description: 'Bike tours, cycling adventures, and pedal-powered journeys.'
  },
  'Event': {
    description: 'Special events, festivals, and memorable occasions.'
  },
  'Festival': {
    description: 'Cultural celebrations, music festivals, and local festivities.'
  },
  'Food': {
    description: 'Culinary adventures, local cuisine, and food discoveries.'
  },
  'Hiking': {
    description: 'Trail adventures, mountain hikes, and nature walks.'
  },
  'History': {
    description: 'Historical sites, monuments, and stories from the past.'
  },
  'Literature': {
    description: 'Bookstores, literary sites, and reading-related experiences.'
  },
  'Museums': {
    description: 'Educational visits to museums and cultural institutions.'
  },
  'Music': {
    description: 'Concerts, musical performances, and sound experiences.'
  },
  'Nature': {
    description: 'Natural landscapes, wildlife, and outdoor experiences.'
  },
  'Nightlife': {
    description: 'Evening entertainment, bars, and after-dark adventures.'
  },
  'Photography': {
    description: 'Capturing moments and photogenic locations.'
  },
  'Pokémon': {
    description: 'Pokémon-related adventures and gaming experiences.'
  },
  'Relaxation': {
    description: 'Peaceful moments, wellness, and stress-free experiences.'
  },
  'Road Trips': {
    description: 'Driving adventures and scenic route explorations.'
  },
  'Shopping': {
    description: 'Local markets, shopping districts, and retail therapy.'
  },
  'Sightseeing': {
    description: 'Tourist attractions and must-see destinations.'
  },
  'Sports': {
    description: 'Athletic activities, sports events, and physical adventures.'
  },
  'Wellness': {
    description: 'Health-focused activities, spas, and well-being experiences.'
  },
  'Wildlife': {
    description: 'Animal encounters and wildlife observation experiences.'
  },
  'Religion': {
    description: 'Exploring beliefs, practices, and spiritual experiences.'
  }
};

// Helper function to get tag description
export function getTagDescription(tagName: string): string {
  return tagConfig[tagName]?.description || `Posts tagged with ${tagName}.`;
}
