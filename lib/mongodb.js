import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

// Don't throw error during build time
if (!uri && process.env.NODE_ENV !== 'production') {
  console.warn("MONGODB_URI is not defined. Please add it to your environment variables.");
}

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

let client;
let clientPromise;

// Only create connection if we have a URI and we're not in build mode
if (uri) {
  if (process.env.NODE_ENV === "development") {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri, options);
      global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
  } else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }
} else {
  // Create a dummy promise that will reject when called
  clientPromise = Promise.reject(new Error("MONGODB_URI is not defined"));
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;
