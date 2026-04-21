import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function screenCandidate(job: any, applicant: any) {
  const model = genAI.getGenerativeModel({ 
    model: "gemini-3-flash-preview",
    generationConfig: { responseMimeType: "application/json" } // Force JSON output
  });

  const prompt = `
    Act as an expert technical recruiter. Evaluate the following candidate against the job description.
    
    Job Description:
    - Title: ${job.title}
    - Requirements: ${job.description}
    - Required Skills: ${job.skills?.join(", ")}
    
    Candidate Profile:
    - Name: ${applicant.firstName} ${applicant.lastName}
    - Experience: ${applicant.experience}
    - Skills: ${applicant.skills?.join(", ")}
    - Headline: ${applicant.headline}

    Return a JSON object with exactly these fields:
    {
      "score": (number between 0-100),
      "verdict": (string: e.g. "Highly Recommended", "Good Match", or "Not Recommended"),
      "reasoning": (string: 2-3 sentences explaining the score),
      "strengths": (array of strings),
      "gaps": (array of strings)
    }
  `;

  const result = await model.generateContent(prompt);
  return JSON.parse(result.response.text());
}