const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const PreparatorySession = require("../models/PreparationSession");
const GeneratedQuestion = require("../models/GeneratedQuestion");
const axios = require("axios");

const upload = require("../middleware/upload") ; 
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth") ;


router.post(
  "/",
  auth,
  upload.single("resume") , 
  async (req, res) => {
    console.log("Received new preparation session request") ;

    console.log("pdfParse type:", typeof pdfParse);

    try {
      const jobDescription = req.body.jobDescription ;
      const file = req.file ; 
      if(!file){
        return res.status(400).json({message : "Resume file is required"}) ;
      }
      let resumeText = "" ; 
      if(file.mimetype === "application/pdf"){
        const data = await pdfParse(file.buffer) ; 
        resumeText = data.text ; 
      }

      else if(file.mimetype === "application/msword" || 
              file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ){
        const result = await mammoth.extractRawText({
          buffer : file.buffer, 
        }) ; 
        resumeText = result.value ;
      }else{
        return res.status(400).json({message : "Unsupported file format. Please upload PDF or Word document."}) ;
      }

      const newSession = new PreparatorySession({
        userId: req.user,
        resumeText: resumeText,          // ✅ fixed key
        jobDescription: jobDescription,
        status: "PENDING",
      });

      // 🔥 CRITICAL FIX
      await newSession.save();

      res.status(201).json({
        message: "Preparation session created successfully",
        sessionId: newSession._id,
      });

      // async call to n8n (non-blocking)
      try {
        await axios.post(process.env.N8N_WEBHOOK_URL, {
          sessionId: newSession._id,
          userId: req.user,
          resumeText : resumeText,
          jobDescription: jobDescription,
        });
      } catch (err) {
        console.error("n8n webhook failed:", err.message);
      }

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  }
);

// GET all sessions for logged-in user
router.get("/", auth, async (req, res) => {
  try {
    const sessions = await PreparatorySession.find({
      userId: req.user,
    }).sort({ createdAt: -1 });

    res.json(sessions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch sessions" });
  }
});


router.get("/:id/questions", auth, async (req, res) => {
  const sessionId = req.params.id;
  console.log("Fetching questions for sessionId:", sessionId);

  try {
    const questions = await GeneratedQuestion.find({ sessionId });

    const response = {
      technical: [],
      hr: [],
    };

    questions.forEach((q) => {
      if (q.type === "TECHNICAL") {
        response.technical.push({
          question: q.question,
          answer: q.answer,
        });
      } else if (q.type === "HR") {
        response.hr.push({
          question: q.question,
          answer: q.answer,
        });
      }
    });

    console.log("Questions fetched successfully");
    return res.json(response);
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
