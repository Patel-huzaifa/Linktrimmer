import clientPromise from "@/lib/mongodb-alt";

export async function GET() {
  try {
    console.log("Test DB Alt: Starting connection test");
    
    // Test MongoDB connection
    let client;
    try {
      client = await clientPromise;
      console.log("Test DB Alt: Client connected successfully");
    } catch (connectionError) {
      console.error("Test DB Alt: Connection failed:", connectionError.message);
      return Response.json({
        success: false,
        error: true,
        message: "Database connection failed",
        details: connectionError.message,
        timestamp: new Date().toISOString()
      }, { status: 500 });
    }
    
    // Test database access
    const db = client.db("linktrimer");
    console.log("Test DB Alt: Database accessed successfully");
    
    // Test collection access
    const collection = db.collection("urls");
    console.log("Test DB Alt: Collection accessed successfully");
    
    // Test a simple query
    const count = await collection.countDocuments();
    console.log("Test DB Alt: Document count:", count);
    
    return Response.json({
      success: true,
      message: "Database connection successful (Alternative)",
      documentCount: count,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error("Test DB Alt Error:", {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    
    return Response.json({
      success: false,
      error: true,
      message: "Database connection failed",
      details: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 