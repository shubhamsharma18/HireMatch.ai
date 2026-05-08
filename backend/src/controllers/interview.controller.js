const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
const PDFDocument = require("pdfkit");
const { generateInterviewReportAi } = require("../services/ai.service.js");
const interviewReportModel = require("../models/interviewReport.model.js");

async function generateInterviewReport(req, res) {
    try {
        const { selfDescription, jobDescription } = req.body;
        let resumeText = "";

        if (req.file) {
            const fileName = req.file.originalname?.toLowerCase() || "";
            const mimeType = req.file.mimetype;

            if (mimeType === "application/pdf" || fileName.endsWith(".pdf")) {
                try {
                    const pdfData = await pdfParse(req.file.buffer);
                    resumeText = pdfData.text;
                } catch (error) {
                    console.error("PDF parsing error:", error);
                    return res.status(400).json({ message: "Failed to parse PDF. Please try a different file or use self-description." });
                }
            } else if (mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || fileName.endsWith(".docx")) {
                const result = await mammoth.extractRawText({ buffer: req.file.buffer });
                resumeText = result.value;
            } else {
                return res.status(400).json({ message: "Unsupported resume format. Please upload a PDF or DOCX file." });
            }
        } else {
            resumeText = selfDescription?.trim() || "";
        }

        if (!jobDescription?.trim() || !resumeText) {
            return res.status(400).json({ message: "Please provide a job description and either a resume or self description." });
        }

        const interviewReportByAi = await generateInterviewReportAi({
            resume: resumeText,
            selfDescription,
            jobDescription
        });

        console.log("AI Response:", interviewReportByAi);
        
        const interviewReport = await interviewReportModel.create({
            user: req.user.id,
            jobDescription,
            selfDescription,
            resume: resumeText,
            ...interviewReportByAi
        });

        console.log("Created interview report:", interviewReport);
        
        res.status(201).json({
            message: "Interview report generated successfully",
            interviewReport
        });
    } catch (error) {
        console.error("Error in generateInterviewReport:", error);
        res.status(500).json({ error: error.message });
    }
}

async function getAllInterviewReports(req, res) {
    try {
        const interviewReports = await interviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json({ interviewReports });
    } catch (error) {
        console.error("Error in getAllInterviewReports:", error);
        res.status(500).json({ error: error.message });
    }
}

async function getInterviewReportById(req, res) {
    try {
        const interviewReport = await interviewReportModel.findOne({ _id: req.params.id, user: req.user.id });
        if (!interviewReport) {
            return res.status(404).json({ message: "Interview report not found" });
        }
        res.status(200).json({ interviewReport });
    } catch (error) {
        console.error("Error in getInterviewReportById:", error);
        res.status(500).json({ error: error.message });
    }
}

async function generateResumePdf(req, res) {
    try {
        const report = await interviewReportModel.findOne({ _id: req.params.id, user: req.user.id });
        if (!report) {
            return res.status(404).json({ message: "Interview report not found" });
        }

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", `attachment; filename=resume_${report._id}.pdf`);

        const doc = new PDFDocument({ size: "A4", margin: 50 });
        doc.pipe(res);

        doc.fontSize(18).text("Interview Report Resume", { underline: true });
        doc.moveDown();
        doc.fontSize(12).text(`Job Description:\n${report.jobDescription || "N/A"}`);
        doc.moveDown();
        doc.text(`Self Description:\n${report.selfDescription || "N/A"}`);
        doc.moveDown();

        if (report.technicalQuestions?.length) {
            doc.fontSize(14).text("Technical Questions", { underline: true });
            report.technicalQuestions.forEach((item, idx) => {
                doc.moveDown(0.5);
                doc.fontSize(12).text(`Q${idx + 1}: ${item.question || item.questions}`);
                doc.text(`Intention: ${item.intention}`);
                doc.text(`Answer: ${item.answer}`);
            });
            doc.moveDown();
        }

        if (report.behavioralQuestions?.length) {
            doc.fontSize(14).text("Behavioral Questions", { underline: true });
            report.behavioralQuestions.forEach((item, idx) => {
                doc.moveDown(0.5);
                doc.fontSize(12).text(`Q${idx + 1}: ${item.question || item.questions}`);
                doc.text(`Intention: ${item.intention}`);
                doc.text(`Answer: ${item.answer}`);
            });
            doc.moveDown();
        }

        if (report.preparationPlan?.length) {
            doc.fontSize(14).text("Preparation Plan", { underline: true });
            report.preparationPlan.forEach((day) => {
                doc.moveDown(0.5);
                doc.fontSize(12).text(`Day ${day.day}: ${day.focus}`);
                if (Array.isArray(day.tasks)) {
                    day.tasks.forEach((task, taskIndex) => {
                        doc.text(`  - ${task}`);
                    });
                }
            });
        }

        doc.end();
    } catch (error) {
        console.error("Error in generateResumePdf:", error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = { generateInterviewReport, getAllInterviewReports, getInterviewReportById, generateResumePdf };