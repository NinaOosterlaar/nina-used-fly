/**
 * Utility function to resolve image URLs for different deployment environments
 * Handles relative image paths and ensures they work with base URLs
 */
export function resolveImageUrl(imagePath: string): string {
  // If it's already an absolute URL, return as-is
  if (imagePath.startsWith('http') || imagePath.startsWith('//')) {
    return imagePath;
  }
  
  // If it's a relative path starting with './', remove the './'
  if (imagePath.startsWith('./')) {
    imagePath = imagePath.slice(2);
  }
  
  // Get the base URL from the environment
  const base = import.meta.env.BASE_URL || '/';
  
  // Ensure the path starts with /
  if (!imagePath.startsWith('/')) {
    imagePath = '/' + imagePath;
  }
  
  // Combine base and image path
  if (base === '/') {
    return imagePath;
  }
  
  return base.endsWith('/') ? base + imagePath.slice(1) : base + imagePath;
}
