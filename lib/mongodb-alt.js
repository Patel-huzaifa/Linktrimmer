import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

// Don't throw error during build time
if (!uri && process.env.NODE_ENV !== 'production') {
  console.warn("MONGODB_URI is not defined. Please add it to your environment variables.");
}

// Alternative options for Vercel deployment - updated without deprecated options
const options = {
  maxPoolSize: 5,
  serverSelectionTimeoutMS: 15000,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 15000,
  // SSL/TLS options for Vercel
  ssl: true,
  tls: true,
  tlsAllowInvalidCertificates: true,
  tlsAllowInvalidHostnames: true,
  retryWrites: true,
  w: 'majority',
  // Additional options for better compatibility
  directConnection: false,
  maxIdleTimeMS: 30000,
  minPoolSize: 1,
  // Network options to prevent ECONNRESET
  family: 4, // Force IPv4
  keepAlive: true,
  keepAliveInitialDelay: 300000,
  // Retry options
  retryReads: true,
  maxConnecting: 2
};

let client;
let clientPromise;

// Only create connection if we have a URI
if (uri) {
  if (process.env.NODE_ENV === "development") {
    // In development mode, use a global variable
    if (!global._mongoClientPromiseAlt) {
      client = new MongoClient(uri, options);
      global._mongoClientPromiseAlt = client.connect();
    }
    clientPromise = global._mongoClientPromiseAlt;
  } else {
    // In production mode
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }
} else {
  // Create a dummy promise that will reject when called
  clientPromise = Promise.reject(new Error("MONGODB_URI is not defined"));
}

export default clientPromise; 