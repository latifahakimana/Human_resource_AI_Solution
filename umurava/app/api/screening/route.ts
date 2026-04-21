import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { screenCandidate } from "@/lib/gemini_service";

export async function POST(req: Request) {
  try {
    const { applicantId, jobId } = await req.json();
    const client = await clientPromise;
    const db = client.db("Umurava_Database");

    // 1. Fetch data from DB
    const [applicant, job] = await Promise.all([
      db.collection("Applicants").findOne({ _id: new ObjectId(applicantId) }),
      db.collection("Jobs").findOne({ _id: new ObjectId(jobId) })
    ]);

    if (!applicant || !job) return NextResponse.json({ error: "Not found" }, { status: 404 });

    // 2. Run Gemini AI
    const aiEvaluation = await screenCandidate(job, applicant);

    // 3. Update Applicant in MongoDB with AI results
    await db.collection("Applicants").updateOne(
      { _id: new ObjectId(applicantId) },
      { 
        $set: { 
          score: aiEvaluation.score,
          verdict: aiEvaluation.verdict,
          reasoning: aiEvaluation.reasoning,
          strengths: aiEvaluation.strengths,
          gaps: aiEvaluation.gaps,
          aiStatus: "screened"
        } 
      }
    );

    return NextResponse.json({ success: true, evaluation: aiEvaluation });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Screening failed" }, { status: 500 });
  }
}