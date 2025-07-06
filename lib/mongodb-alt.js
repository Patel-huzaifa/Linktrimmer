import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

// Don't throw error during build time
if (!uri && process.env.NODE_ENV !== 'production') {
  console.warn("MONGODB_URI is not defined. Please add it to your environment variables.");
}

// Alternative options for Vercel deployment
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  maxPoolSize: 5,
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 10000,
  // SSL/TLS options for Vercel
  ssl: true,
  tls: true,
  tlsAllowInvalidCertificates: true, // More permissive for Vercel
  tlsAllowInvalidHostnames: true,    // More permissive for Vercel
  retryWrites: true,
  w: 'majority',
  // Additional options for better compatibility
  directConnection: false,
  maxIdleTimeMS: 30000,
  minPoolSize: 1
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