// Travel configuration, update here to appear on travels and travel pages.
export const travelConfig: Record<string, {
  description: string;
  heroImage: string;
}> = {
  'Day Trips in The Netherlands': {
    description: "Since I live in The Netherlands, I do a lot of activities in this country. This travel is not really a travel, but more a collection of day trips I have done in The Netherlands. More day trips will appear in the future.",
    heroImage: '/Travels_covers/netherlands.jpg'
  },
  'Musical Trip to Belgium': {
    description: "Going to Belgium for an Ed Sheeran concert. After the concert, we explored Bruges and Ghent, two beautiful cities.",
    heroImage: '/Travels_covers/castle.jpg'
    },
    'City Trips': {
    description: "This page is dedicated to my city trips. They do not cover a consecutive journey I took, but this is more of a collection of different cities I visited for a day or a few days.",
    heroImage: '/Travels_covers/Sebas_paris.jpg'
    },
};

export function getTravelPreview(travelName: string, maxLength: number = 155): string {
  const fullDescription = travelConfig[travelName]?.description || `Discover my adventures and experiences from ${travelName}. From hidden gems to popular attractions, read about what made this destination special.`;
  
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

export function getTravelDescription(travelName: string): string {
  return travelConfig[travelName]?.description || `Exploring the diverse cultures, stunning landscapes, and rich experiences of ${travelName}.`;
}

export function getTravelHeroImage(travelName: string, fallbackImage?: string): string {
  return travelConfig[travelName]?.heroImage || fallbackImage || '/assets/fidough.png';
}
