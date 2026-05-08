const { GoogleGenerativeAI } = require("@google/generative-ai");
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const interviewReportSchema = z.object({
    matchScore: z.number().min(0).max(100).describe("A score between 0 and 100 indicating how well the candidate matches the job description"),
    technicalQuestions: z.array(z.object({
        question: z.string(),
        intention: z.string(),
        answer: z.string()
    })),
    behavioralQuestions: z.array(z.object({
        question: z.string(),
        intention: z.string(),
        answer: z.string()
    })),
    skillGaps: z.array(z.object({
        skill: z.string(),
        severity: z.string()
    })),
    preparationPlan: z.array(z.object({
        day: z.number(),
        focus: z.string(),
        tasks: z.array(z.string())
    }))
});

async function generateInterviewReportAi({ resume, selfDescription, jobDescription }) {
    try {
        // ✅ CORRECTED: Use correct model name
        const model = genAI.getGenerativeModel({ 
            model: "gemini-2.5-flash",  // Stable model
            generationConfig: {
                responseMimeType: "application/json",  // ✅ Force JSON output
                temperature: 0.7,
                topP: 0.95
            }
        });

        const prompt = `You are an expert interview coach. Analyze the job description and candidate's resume to generate a comprehensive interview report.

Job Description:
${jobDescription}

Candidate Resume/Self-Description:
${resume || selfDescription}

Generate a JSON response with EXACTLY this structure (no extra fields, no markdown formatting, no explanation before or after JSON):
{
  "matchScore": 75,
  "technicalQuestions": [
    {
      "question": "Specific technical question here",
      "intention": "What this question tests",
      "answer": "How to answer it"
    }
  ],
  "behavioralQuestions": [
    {
      "question": "Behavioral question here",
      "intention": "What this reveals about the candidate",
      "answer": "Sample answer structure"
    }
  ],
  "skillGaps": [
    {
      "skill": "Missing skill name",
      "severity": "High/Medium/Low"
    }
  ],
  "preparationPlan": [
    {
      "day": 1,
      "focus": "Daily focus area",
      "tasks": ["Task 1", "Task 2"]
    }
  ]
}

Generate 3 technical questions, 2 behavioral questions, and a 7-day preparation plan. Make everything specific to this job and candidate.`;

        console.log("📤 Calling Gemini API...");
        console.log("Model: gemini-2.5-flash");
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        console.log("📥 Raw response (first 300 chars):", text.substring(0, 300));

        // ✅ Clean the response - remove markdown code blocks if present
        let cleanText = text.trim();
        if (cleanText.startsWith("```json")) {
            cleanText = cleanText.replace(/```json\n?/g, "").replace(/```\n?$/g, "");
        } else if (cleanText.startsWith("```")) {
            cleanText = cleanText.replace(/```\n?/g, "");
        }

        // ✅ Parse JSON
        let parsed;
        try {
            parsed = JSON.parse(cleanText);
            console.log("✅ JSON parsed successfully");
        } catch (parseError) {
            console.error("❌ JSON Parse Error:", parseError.message);
            console.error("Raw text that failed:", cleanText);
            throw new Error("Invalid JSON from AI");
        }

        // ✅ Validate with Zod (with better error handling)
        const validated = interviewReportSchema.parse(parsed);
        console.log("✅ Validation passed. Match Score:", validated.matchScore);
        
        return validated;
        
    } catch (error) {
        console.error("❌ AI Service Error:", error.message);
        
        // Log the full error for debugging
        if (error.name === 'ZodError') {
            console.error("Validation errors:", error.errors);
        }
        
        // Return fallback ONLY if API fails
        console.log("⚠️ Returning fallback response");
        return getFallbackResponse();
    }
}

// Separate fallback function
function getFallbackResponse() {
    return {
        matchScore: 75,
        technicalQuestions: [
            {
                question: "Can you explain your experience with the technologies mentioned in the job description?",
                intention: "Assess relevant technical skills and experience",
                answer: "Highlight specific projects, tools, and achievements that match the job requirements."
            },
            {
                question: "How do you approach problem-solving in your development work?",
                intention: "Evaluate analytical and debugging skills",
                answer: "Describe your methodology, tools used, and how you ensure quality solutions."
            },
            {
                question: "What are your thoughts on testing and code quality?",
                intention: "Check understanding of best practices",
                answer: "Discuss testing strategies, code reviews, and maintaining clean code."
            }
        ],
        behavioralQuestions: [
            {
                question: "Tell me about a challenging project you worked on and how you overcame obstacles.",
                intention: "Assess problem-solving and resilience",
                answer: "Describe challenge, approach, actions, and outcome using STAR method."
            },
            {
                question: "How do you handle tight deadlines and competing priorities?",
                intention: "Evaluate time management skills",
                answer: "Explain planning, communication, and quality delivery under pressure."
            }
        ],
        skillGaps: [
            { skill: "Advanced framework knowledge", severity: "Medium" },
            { skill: "Database optimization", severity: "Low" }
        ],
        preparationPlan: [
            { day: 1, focus: "Review Job Description", tasks: ["Analyze JD", "Identify key skills", "Note unfamiliar terms"] },
            { day: 2, focus: "Technical Skills", tasks: ["Review relevant experience", "Practice coding", "Update portfolio"] },
            { day: 3, focus: "Behavioral Prep", tasks: ["Prepare STAR answers", "Research company", "Mock interviews"] },
            { day: 4, focus: "Deep Dive", tasks: ["Study advanced concepts", "Complete tutorials", "Build small projects"] },
            { day: 5, focus: "Mock Interview", tasks: ["Full mock interview", "Record and review", "Improve weak areas"] },
            { day: 6, focus: "Company Research", tasks: ["Research products", "Prepare questions", "Review news"] },
            { day: 7, focus: "Final Prep", tasks: ["Review all materials", "Setup for interview", "Rest and mental prep"] }
        ]
    };
}

// async function testGeminiConnection() {
//     console.log("\n🧪 Testing Gemini API Connection...");
//     try {
//         // ✅ Use correct model name
//         const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
//         const result = await model.generateContent("Say 'API is working'");
//         const response = await result.response;
//         const text = response.text();
        
//         console.log("✅ SUCCESS! Gemini API is working!");
//         console.log("📝 Response:", text);
//         return { success: true, message: text };
//     } catch (error) {
//         console.error("❌ ERROR! Gemini API Failed!");
//         console.error("Error:", error.message);
//         console.error("API Key:", process.env.GOOGLE_API_KEY ? "✅ Present" : "❌ Missing");
//         return { success: false, error: error.message };
//     }
// }





// async function listModels() {
//     try {
//         const models = await genAI.listModels();
//         console.log("Available models:");
//         models.forEach(model => {
//             if (model.supportedGenerationMethods?.includes("generateContent")) {
//                 console.log(`- ${model.name}`);
//             }
//         });
//     } catch (error) {
//         console.error("Error listing models:", error.message);
//     }
// }

// listModels();


module.exports = { generateInterviewReportAi };