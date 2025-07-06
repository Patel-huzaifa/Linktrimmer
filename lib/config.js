// Configuration for the application
export const config = {
  mongodb: {
    uri: process.env.MONGODB_URI,
    database: 'linktrimer',
    collection: 'urls'
  },
  app: {
    name: 'LinkTrimer',
    baseUrl: process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'
  }
};

// Check if required environment variables are set
export const validateConfig = () => {
  const errors = [];
  
  if (!config.mongodb.uri) {
    errors.push('MONGODB_URI environment variable is not set');
  }
  
  return errors;
};

// Get configuration for runtime (not build time)
export const getRuntimeConfig = () => {
  const errors = validateConfig();
  if (errors.length > 0) {
    console.warn('Configuration errors:', errors);
  }
  
  return config;
}; 