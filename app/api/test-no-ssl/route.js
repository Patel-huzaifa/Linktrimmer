import { MongoClient } from "mongodb";

export async function GET() {
  try {
    console.log("Test No SSL: Starting connection test without SSL");
    
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      return Response.json({
        success: false,
        error: true,
        message: "MONGODB_URI not found",
        timestamp: new Date().toISOString()
      }, { status: 500 });
    }

    console.log("Test No SSL: URI found, attempting connection without SSL");
    
    // Try connection without SSL options
    const client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 10000,
      // No SSL options
      maxPoolSize: 1,
      minPoolSize: 0
    });

    try {
      await client.connect();
      console.log("Test No SSL: Connection successful without SSL");
      
      // Test if we can access the database
      const db = client.db("linktrimer");
      console.log("Test No SSL: Database access successful");
      
      await client.close();
      console.log("Test No SSL: Connection closed successfully");
      
      return Response.json({
        success: true,
        message: "Connection successful without SSL",
        timestamp: new Date().toISOString()
      });
      
    } catch (connectionError) {
      console.error("Test No SSL: Connection failed:", connectionError.message);
      return Response.json({
        success: false,
        error: true,
        message: "Connection failed even without SSL",
        details: connectionError.message,
        timestamp: new Date().toISOString()
      }, { status: 500 });
    }
    
  } catch (error) {
    console.error("Test No SSL Error:", {
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