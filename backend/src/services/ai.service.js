const { GoogleGenAI } = require("@google/genai")
const { json, z } =require("zod");
const { zodToJsonSchema } =require("zod-to-json-schema");


const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY
})


const interviewReportSchema = z.object({

    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate matches the job description"),  

    technicalQuestions: z.array(z.object(
        {
            question: z.string().describe("Technical questions that can be asked in the interview"),
            intention: z.string().describe("What is the intention behind the question"),
            answer: z.string().describe("How to answer this question and what points to cover")
        }
    )).describe("Technical questions that can be asked in the interview along with the intention behind "),
    behavioralQuestions: z.array(z.object(
        {
            question: z.string().describe("Behavioral questions that can be asked in the interview"),
            intention: z.string().describe("What is the intention behind the question"),
            answer: z.string().describe("How to answer this question and what points to cover")
        }


    )).describe("Behavioral questions that can be asked in the interview along with the intention behind "),
    skillGaps: z.array(z.object(
        {
            skill: z.string().describe("Skill that the candidate is lacking"),
            severity: z.string().describe("How severe is the skill gap")


        })).describe("list of skill gaps that the candidate has along with the severity of the skill gap"),


    preparationPlan: z.array(z.object(

        {
            day: z.number().describe("Day number in the preparation plan"),
            focus: z.string().describe("What to focus on that day to prepare for the interview"),
            tasks: z.array(z.string()).describe("List of tasks to be done on that day to prepare for the interview")

        }
)).describe("A preparation plan for the candidate to prepare for the interview based on the skill gaps and the job description")
})

async function generateInterviewReportAi({ resume, selfDescription, jobDescription }) {
    // Mock response for testing
    return {
        matchScore: 75,
        technicalQuestions: [
            {
                question: "Can you explain the difference between var, let, and const in JavaScript?",
                intention: "Assess understanding of JavaScript variable declarations and scoping",
                answer: "Var is function-scoped and can be redeclared, let is block-scoped and can be reassigned but not redeclared, const is block-scoped and cannot be reassigned or redeclared."
            },
            {
                question: "How does React's virtual DOM work?",
                intention: "Test knowledge of React's core optimization mechanism",
                answer: "React creates a virtual representation of the DOM in memory. When state changes, React compares the new virtual DOM with the previous one (reconciliation) and only updates the actual DOM with the differences."
            }
        ],
        behavioralQuestions: [
            {
                question: "Tell me about a time when you had to learn a new technology quickly.",
                intention: "Assess adaptability and learning ability",
                answer: "Describe a specific project where you learned a new framework or tool under time constraints. Focus on your approach to learning, resources used, and the outcome."
            }
        ],
        skillGaps: [
            { skill: "TypeScript", severity: "Medium" },
            { skill: "Testing", severity: "Low" }
        ],
        preparationPlan: [
            {
                day: 1,
                focus: "JavaScript Fundamentals Review",
                tasks: ["Review closures and prototypes", "Practice async/await patterns", "Complete 10 LeetCode easy problems"]
            },
            {
                day: 2,
                focus: "React Advanced Concepts",
                tasks: ["Study React hooks in depth", "Build a small project with custom hooks", "Review component lifecycle"]
            }
        ]
    };
}

    

module.exports = { generateInterviewReportAi }