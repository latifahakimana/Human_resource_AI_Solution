import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("Umurava_Database");

    // Fetch counts and data in parallel for better performance
    const [activeJobs, totalApplicants, shortlisted, recentJobs] = await Promise.all([
      db.collection("Jobs").countDocuments({ status: "active" }),
      db.collection("Applicants").countDocuments(),
      db.collection("Applicants").countDocuments({ status: "shortlisted" }),
      db.collection("Jobs").find({}).sort({ createdAt: -1 }).limit(4).toArray()
    ]);

    // Mock analytics logic (can be calculated from data later)
    const analytics = [
      { label: 'M', val: 12, h: 40 },
      { label: 'T', val: 19, h: 65 },
      { label: 'W', val: 15, h: 50 },
      { label: 'T', val: 25, h: 85 },
      { label: 'F', val: 22, h: 75 },
      { label: 'S', val: 10, h: 35 },
      { label: 'S', val: 8, h: 25 },
    ];

    return NextResponse.json({
      stats: [
        { label: 'Active Jobs', value: activeJobs.toString(), color: 'var(--blue-500)' },
        { label: 'Total Applicants', value: totalApplicants.toString(), color: 'var(--accent)' },
        { label: 'Shortlisted', value: shortlisted.toString(), color: 'var(--success)' },
        { label: 'AI Screenings', value: '31', color: 'var(--warn)' },
      ],
      recentJobs,
      analytics
    });
  } catch (error) {
    console.error("Dashboard API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}