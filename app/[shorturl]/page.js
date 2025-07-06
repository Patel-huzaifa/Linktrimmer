import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import clientPromise from "@/lib/mongodb";

export default async function Page({ params }) {
  try {
    console.log("Redirect: Starting redirect process");
    
    const shorturl = (await params).shorturl;
    console.log("Redirect: Short URL parameter:", shorturl);
    
    console.log("Redirect: Attempting MongoDB connection");
    const client = await clientPromise;
    console.log("Redirect: MongoDB client connected successfully");
    
    const db = client.db("linktrimer");
    console.log("Redirect: Database accessed");
    
    const collection = db.collection("urls");
    console.log("Redirect: Collection accessed");
    
    console.log("Redirect: Searching for short URL:", shorturl);
    const doc = await collection.findOne({ shorturl: shorturl });
    
    if (doc) {
      console.log("Redirect: Found URL, redirecting to:", doc.url);
      redirect(doc.url);
    } else {
      console.log("Redirect: Short URL not found, showing 404");
      notFound();
    }
  } catch (error) {
    console.error("Redirect Error Details:", {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    
    // If there's a database connection error, show 404 instead of crashing
    if (error.message.includes("MongoDB") || 
        error.message.includes("MONGODB_URI") ||
        error.message.includes("ECONNREFUSED") ||
        error.message.includes("ENOTFOUND") ||
        error.message.includes("ETIMEDOUT")) {
      console.log("Redirect: Database connection error, showing 404");
      notFound();
    }
    
    // For other errors, also show 404 to prevent crashes
    console.log("Redirect: Unexpected error, showing 404");
    notFound();
  }
}
