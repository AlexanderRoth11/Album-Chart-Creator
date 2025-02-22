import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/uitls/mongo";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db("sample_mflix");
    const movies = await db.collection("movies").find({}).toArray();
    return NextResponse.json(movies);
  } catch (e) {
    console.error(e);
    return new NextResponse("An error occurred" + e, { status: 500 });
  }
}
