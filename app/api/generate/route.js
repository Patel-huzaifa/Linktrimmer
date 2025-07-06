import clientPromise from "@/lib/mongodb";

export async function POST(req) {
  try {
    console.log("API: Starting request processing");
    
    const body = await req.json();
    console.log("API: Request body received:", { url: body.url, shorturl: body.shorturl });

    // Validate required fields
    if (!body.url || !body.shorturl) {
      console.log("API: Missing required fields");
      return Response.json({
        success: false,
        error: true,
        message: "URL and short URL are required",
      }, { status: 400 });
    }

    // Validate URL format
    try {
      new URL(body.url);
    } catch (error) {
      console.log("API: Invalid URL format");
      return Response.json({
        success: false,
        error: true,
        message: "Invalid URL format",
      }, { status: 400 });
    }

    console.log("API: Attempting MongoDB connection");
    
    // Connect to MongoDB
    const client = await clientPromise;
    console.log("API: MongoDB client connected successfully");
    
    const db = client.db("linktrimer");
    console.log("API: Database accessed");
    
    const collection = db.collection("urls");
    console.log("API: Collection accessed");

    // Check if the shorturl is already in the database
    console.log("API: Checking for existing short URL:", body.shorturl);
    const doc = await collection.findOne({ shorturl: body.shorturl });
    
    if (doc) {
      console.log("API: Short URL already exists");
      return Response.json({
        success: false,
        error: true,
        message: "Short URL already exists. Try with a different short name URL",
      }, { status: 409 });
    }

    console.log("API: Inserting new URL mapping");
    const result = await collection.insertOne({
      url: body.url,
      shorturl: body.shorturl,
      createdAt: new Date(),
    });

    console.log("API: URL inserted successfully:", result.insertedId);

    return Response.json({
      success: true,
      error: false,
      message: "URL generated successfully",
      result,
    });

  } catch (error) {
    console.error("API Error Details:", {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    
    // Check if it's a MongoDB connection error
    if (error.message.includes("MongoDB") || 
        error.message.includes("MONGODB_URI") ||
        error.message.includes("ECONNREFUSED") ||
        error.message.includes("ENOTFOUND") ||
        error.message.includes("ETIMEDOUT")) {
      return Response.json({
        success: false,
        error: true,
        message: "Database connection error. Please check your MongoDB configuration.",
        details: error.message
      }, { status: 500 });
    }

    // Check if it's a network error
    if (error.message.includes("fetch") || error.message.includes("network")) {
      return Response.json({
        success: false,
        error: true,
        message: "Network error. Please try again.",
        details: error.message
      }, { status: 500 });
    }

    return Response.json({
      success: false,
      error: true,
      message: "Internal server error",
      details: error.message
    }, { status: 500 });
  }
}
