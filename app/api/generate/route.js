import clientPromise from "@/lib/mongodb";

export async function POST(req) {
  try {
    const body = await req.json();

    // Validate required fields
    if (!body.url || !body.shorturl) {
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
      return Response.json({
        success: false,
        error: true,
        message: "Invalid URL format",
      }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("linktrimer");
    const collection = db.collection("urls");

    // Check if the shorturl is already in the database
    const doc = await collection.findOne({ shorturl: body.shorturl });
    if (doc) {
      return Response.json({
        success: false,
        error: true,
        message: "Short URL already exists. Try with a different short name URL",
      }, { status: 409 });
    }

    const result = await collection.insertOne({
      url: body.url,
      shorturl: body.shorturl,
      createdAt: new Date(),
    });

    return Response.json({
      success: true,
      error: false,
      message: "URL generated successfully",
      result,
    });

  } catch (error) {
    console.error("API Error:", error);
    
    // Check if it's a MongoDB connection error
    if (error.message.includes("MongoDB") || error.message.includes("MONGODB_URI")) {
      return Response.json({
        success: false,
        error: true,
        message: "Database connection error. Please check your MongoDB configuration.",
      }, { status: 500 });
    }

    return Response.json({
      success: false,
      error: true,
      message: "Internal server error",
    }, { status: 500 });
  }
}
