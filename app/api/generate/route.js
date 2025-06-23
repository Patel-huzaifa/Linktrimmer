import clientPromise from "@/lib/mongodb";

export async function POST(req) {
  const body = await req.json();

  const client = await clientPromise;
  const db = client.db("linktrimer");
  const collection = db.collection("urls");

  //* Check if the shorturl is already in the database
  const doc = await collection.findOne({ shorturl: body.shorturl });
  if (doc) {
    return Response.json({
      success: false,
      error: true,
      message: "Short URL already exists",
    });
  } 
  const result = await collection.insertOne({
    url: body.url,
    shorturl: body.shorturl,
  });

  return Response.json({
    success: true,
    error: false,
    message: "URL generated successfully",
    result,
  });
}
