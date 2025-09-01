// Plan configuration, update here to appear on plans and plan pages
export const planConfig: Record<string, {
    description: string;
    heroImage: string;
}> = {
    'Three Weeks South Korea': {
        description: 'A comprehensive 3-week itinerary exploring the highlights of South Korea in the fall.',
        heroImage: 'plans/Plans_covers/Flag_of_South_Korea.png'
    }
};

export function getPlanPreview(planName: string, maxLength: number = 155): string {
  const fullDescription = planConfig[planName]?.description || `Discover my adventures and experiences from ${planName}. From hidden gems to popular attractions, read about what made this destination special.`;
  
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

export function getPlanDescription(planName: string): string {
  return planConfig[planName]?.description || `Planning to explore the culture and attractions of ${planName}.`;
}

export function getPlanHeroImage(planName: string, fallbackImage?: string): string {
  return planConfig[planName]?.heroImage || fallbackImage || '/assets/fidough.png';
}
