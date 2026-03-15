const express = require("express");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
require("dotenv").config();
const { OpenAI } = require("openai");

const app = express();

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const upload = multer({ dest: 'uploads/' });

/* Serve frontend */
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// 1. Accept audio from frontend & Convert speech to text using Whisper
app.post("/speech", upload.single('audio'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No audio file provided" });
    }
    
    // Whisper requires a recognized file extension
    const newPath = req.file.path + '.webm';
    fs.renameSync(req.file.path, newPath);
    
    const audioStream = fs.createReadStream(newPath);
    
    const transcription = await openai.audio.transcriptions.create({
      file: audioStream,
      model: "whisper-1",
    });

    // Clean up temp file
    fs.unlinkSync(newPath);

    res.json({ text: transcription.text });
  } catch (error) {
    console.error("Error in /speech:", error);
    res.status(500).json({ error: "Failed to transcribe audio" });
  }
});

// 2. Generate next interview question
app.post("/generate-question", async (req, res) => {
  try {
    const { answer } = req.body;
    
    if (!answer) {
      return res.status(400).json({ error: "No answer provided" });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are an expert AI interview coach. The user will provide their answer to an interview question. Analyze their answer briefly and generate a relevant follow-up interview question to keep the conversation going seamlessly. Keep the generated question relatively concise." },
        { role: "user", content: answer }
      ],
    });

    const questionText = completion.choices[0].message.content;
    
    res.json({ question: questionText });
  } catch (error) {
    console.error("Error in /generate-question:", error);
    res.status(500).json({ error: "Failed to generate question" });
  }
});

// 3. Convert text question into speech
app.post("/speak", async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: "No text provided" });
    }

    const mp3Response = await openai.audio.speech.create({
      model: "tts-1",
      voice: "alloy",
      input: text,
    });

    const buffer = Buffer.from(await mp3Response.arrayBuffer());
    
    res.set({
      'Content-Type': 'audio/mpeg',
      'Content-Length': buffer.length
    });
    
    res.send(buffer);
  } catch (error) {
    console.error("Error in /speak:", error);
    res.status(500).json({ error: "Failed to generate speech" });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
