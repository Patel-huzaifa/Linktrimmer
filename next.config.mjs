/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable external packages for server components
  serverExternalPackages: ['mongodb'],
  
  // Handle environment variables during build
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
  },
  
  // Ensure API routes are properly handled
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type' },
        ],
      },
    ];
  },
};

export default nextConfig;
