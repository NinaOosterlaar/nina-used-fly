// Country configurations - update descriptions here and they'll appear on both continent and country pages
export const countryConfig: Record<string, {
  description: string;
  flag: string;
  heroImage: string;
}> = {
  'France': {
    description: 'France, the country of people that refuse to speak English and Disneyland. Is that rude to say? I have not thoroughly explored France yet, but I have visited Paris, which is one of the most beautiful cities I have been to. I aspire to explore more of France in the future, especially the smaller towns and countryside.',
    flag: '🇫🇷',
    heroImage: '/Country_covers/france.jpg'
  },
  'Belgium': {
    description: 'Ah, our neighbours. Belgium has some beautiful cities, maybe even more beautiful than the Dutch cities? I feel like a traitor. Maybe we can colonize it again? I have only been to the flemish part of Belgium, but I would love to explore the Walloon region as well.',
    flag: '🇧🇪',
    heroImage: '/Country_covers/belgium.jpg'
  },
  'Netherlands': {
    description: 'My home country, the Netherlands. I have lived here my whole life. I was born in the east of the Netherlands, lived in Zwolle for a while. Now I am studying in Delft. ',
    flag: '🇳🇱',
    heroImage: '/Country_covers/netherlands.jpg'
  },
  'South Korea': {
    description: 'South Korea is a fascinating blend of ancient traditions and cutting-edge technology. From the bustling streets of Seoul to the serene temples and beautiful landscapes, South Korea offers a unique cultural experience. I visited during the fall season, which added an extra layer of beauty to the trip with vibrant autumn foliage.',
    flag: '🇰🇷',
    heroImage: '/Country_covers/south_korea.JPG'
  }

};

// Helper function to get country preview text (truncated for continent pages)
export function getCountryPreview(countryName: string, maxLength: number = 155): string {
  const fullDescription = countryConfig[countryName]?.description || `Discover my adventures and experiences from ${countryName}. From hidden gems to popular attractions, read about what made this destination special.`;
  
  if (fullDescription.length <= maxLength) {
    return fullDescription;
  }
  
  // Truncate at the last complete word before maxLength
  const truncated = fullDescription.substring(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');
  
  if (lastSpaceIndex > 0) {
    return truncated.substring(0, lastSpaceIndex) + '...';
  }
  
  return truncated + '...';
}

// Helper function to get full country description
export function getCountryDescription(countryName: string): string {
  return countryConfig[countryName]?.description || `Exploring the diverse cultures, stunning landscapes, and rich experiences of ${countryName}.`;
}

// Helper function to get country flag
export function getCountryFlag(countryName: string): string {
  return countryConfig[countryName]?.flag || '🌍';
}

// Helper function to get country hero image
export function getCountryHeroImage(countryName: string, fallbackImage?: string): string {
  return countryConfig[countryName]?.heroImage || fallbackImage || '/assets/fidough.png';
}
