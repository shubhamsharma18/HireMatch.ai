const express = require("express");
const authMiddleware = require("../middleware/auth.middleware.js");
const upload = require("../middleware/file.middleware.js");
const { generateInterviewReport, getAllInterviewReports, getInterviewReportById, generateResumePdf } = require("../controllers/interview.controller.js");

const interviewRouter = express.Router();

interviewRouter.post("/", authMiddleware, upload.single("resume"), generateInterviewReport);
interviewRouter.get("/", authMiddleware, getAllInterviewReports);
interviewRouter.get("/report/:id", authMiddleware, getInterviewReportById);
interviewRouter.post("/resume/pdf/:id", authMiddleware, generateResumePdf);

module.exports = interviewRouter;