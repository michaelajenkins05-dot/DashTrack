// Environment configuration for different deployment targets
export const config = {
  // Base path for GitHub Pages deployment
  basePath: import.meta.env.PROD ? '/DashTrack' : '',
  
  // API base URL - adjust for production deployment
  apiBaseUrl: import.meta.env.PROD 
    ? 'https://michaelajenkins05-dot.github.io/DashTrack/api' 
    : '/api',
    
  // App URL
  appUrl: import.meta.env.PROD 
    ? 'https://michaelajenkins05-dot.github.io/DashTrack' 
    : 'http://localhost:5000',
};