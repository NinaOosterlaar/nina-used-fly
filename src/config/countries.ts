// Country configurations - update descriptions here and they'll appear on both continent and country pages
export const countryConfig: Record<string, {
  description: string;
  flag: string;
}> = {
  'France': {
    description: 'France, the country of people that refuse to speak English and Disneyland. Is that rude to say? I have not thoroughly explored France yet, but I have visited Paris, which is one of the most beautiful cities I have been to. I aspire to explore more of France in the future, especially the smaller towns and countryside.',
    flag: '🇫🇷'
  },
  'Belgium': {
    description: 'Ah, our neighbours. Belgium has some beautiful cities, maybe even more beautiful than the Dutch cities? I feel like a traitor. Maybe we can colonize it again? I have only been to the flemish part of Belgium, but I would love to explore the Walloon region as well.',
    flag: '🇧🇪'
    },

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
