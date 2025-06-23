import { redirect } from "next/navigation";
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export default async function Page({ params }) {
  const shorturl = (await params).shorturl;
  const client = await clientPromise;
  const db = client.db("linktrimer");
  const collection = db.collection("urls");
  const doc = await collection.findOne({ shorturl: shorturl });
  if (doc) {
    redirect(doc.url);
  } else {
    redirect(`${process.env.NEXT_PUBLIC_URL}/404`);
  }
}
