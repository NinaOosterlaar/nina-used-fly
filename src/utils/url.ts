/**
 * Utility function to create URLs with proper base path
 * This automatically handles the base URL for GitHub Pages deployment
 */
export function createUrl(path: string): string {
  const base = import.meta.env.BASE_URL;
  // Remove leading slash from path if it exists to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  // Ensure base ends with slash and combine with path
  const baseWithSlash = base.endsWith('/') ? base : base + '/';
  return baseWithSlash + cleanPath;
}

/**
 * For convenience, you can also use this shorter alias
 */
export const url = createUrl;
