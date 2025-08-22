// Environment configuration for different deployment targets
export const config = {
  // Base path for GitHub Pages deployment
  basePath: import.meta.env.VITE_BASE_PATH || (import.meta.env.PROD ? '/DashTrack' : ''),
  
  // App URL
  appUrl: import.meta.env.PROD 
    ? 'https://michaelajenkins05-dot.github.io/DashTrack' 
    : 'http://localhost:5000',
};