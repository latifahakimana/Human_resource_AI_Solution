

import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(
  request: Request,

  { params }: { params: Promise<{ id: string }> } 
) {
  try {
    
    const { id } = await params; 

    const client = await clientPromise;
    const db = client.db("Umurava_Database");


    const applicant = await db.collection("Applicants").findOne({
      _id: new ObjectId(id),
    });

    if (!applicant) {
      return NextResponse.json(
        { error: `Applicant with ID ${id} not found` }, 
        { status: 404 }
      );
    }

    return NextResponse.json(applicant);
  } catch (error) {
    console.error("Fetch Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error or Invalid ID format" },
      { status: 500 }
    );
  }
}
