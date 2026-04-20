import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("Umurava_Database");
    const restaurants = await db
      .collection("Jobs")
      .find({})
      .toArray();

    return NextResponse.json(restaurants);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}