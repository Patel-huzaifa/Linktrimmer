import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import clientPromise from "@/lib/mongodb";

export default async function Page({ params }) {
  try {
    const shorturl = (await params).shorturl;
    const client = await clientPromise;
    const db = client.db("linktrimer");
    const collection = db.collection("urls");
    const doc = await collection.findOne({ shorturl: shorturl });
    
    if (doc) {
      redirect(doc.url);
    } else {
      notFound();
    }
  } catch (error) {
    console.error("Redirect error:", error);
    notFound();
  }
}
