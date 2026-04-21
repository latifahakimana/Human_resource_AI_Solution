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

export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("Umurava_Database");
    
    // Get data from the request body
    const body = await request.json();


    const jobData = {
      ...body,
      applicants: 0,
      status: "active",
      createdAt: new Date(),
    };

    const result = await db.collection("Jobs").insertOne(jobData);

    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Failed to post job" }, { status: 500 });
  }
}