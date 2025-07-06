import { MongoClient } from "mongodb";

export async function GET() {
  try {
    console.log("Test Connection: Starting basic connection test");
    
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      return Response.json({
        success: false,
        error: true,
        message: "MONGODB_URI not found",
        timestamp: new Date().toISOString()
      }, { status: 500 });
    }

    console.log("Test Connection: URI found, attempting connection");
    
    // Simple connection test with minimal options
    const client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
      socketTimeoutMS: 5000,
      ssl: true,
      tls: true,
      tlsAllowInvalidCertificates: true,
      tlsAllowInvalidHostnames: true
    });

    try {
      await client.connect();
      console.log("Test Connection: Basic connection successful");
      
      // Test if we can access the database
      const db = client.db("linktrimer");
      console.log("Test Connection: Database access successful");
      
      await client.close();
      console.log("Test Connection: Connection closed successfully");
      
      return Response.json({
        success: true,
        message: "Basic connection test successful",
        timestamp: new Date().toISOString()
      });
      
    } catch (connectionError) {
      console.error("Test Connection: Connection failed:", connectionError.message);
      return Response.json({
        success: false,
        error: true,
        message: "Connection test failed",
        details: connectionError.message,
        timestamp: new Date().toISOString()
      }, { status: 500 });
    }
    
  } catch (error) {
    console.error("Test Connection Error:", {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    
    return Response.json({
      success: false,
      error: true,
      message: "Connection test error",
      details: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 