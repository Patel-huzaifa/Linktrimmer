import { redirect } from "next/navigation";
import clientPromise from "@/lib/mongodb";

export default async function Page({ params }) {
  const shorturl = (await params).shorturl;
  const client = await clientPromise;
  const db = client.db("linktrimer");
  const collection = db.collection("urls");
  const doc = await collection.findOne({ shorturl: shorturl });
  
  if (doc) {
    redirect(doc.url);
  } else {
    // Use a fallback URL if NEXT_PUBLIC_URL is not defined
    const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
    redirect(`${baseUrl}/404`);
  }
}
