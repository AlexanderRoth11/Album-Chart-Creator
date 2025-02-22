import { NextResponse } from "next/server";
import clientPromise from "@/uitls/mongo";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("albums");
    const largeAlbums = await db.collection("large_albums").find({}).toArray();
    const mediumAlbums = await db.collection("medium_albums").find({}).toArray();
    const smallAlbums = await db.collection("small_albums").find({}).toArray();
    return NextResponse.json({ largeAlbums, mediumAlbums, smallAlbums });
  } catch (e) {
    console.error(e);
    return new NextResponse("An error occurred" + e, { status: 500 });
  }
}
