from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from backend.core.ai_engine import transcribe_speech, generate_followup_question, synthesize_speech

app = FastAPI(title="Antrix AI API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Antrix AI Backend is operational"}

@app.post("/api/speech")
async def speech_to_text_endpoint(audio: UploadFile = File(...)):
    text = await transcribe_speech(audio)
    return {"text": text}

@app.post("/api/generate-question")
async def generate_question_endpoint(data: dict):
    answer = data.get("answer")
    if not answer:
        raise HTTPException(status_code=400, detail="No answer provided")
    
    question = await generate_followup_question(answer)
    return {"question": question}

@app.post("/api/speak")
async def text_to_speech_endpoint(data: dict):
    text = data.get("text")
    if not text:
        raise HTTPException(status_code=400, detail="No text provided")
    
    audio_bytes = await synthesize_speech(text)
    return StreamingResponse(audio_bytes, media_type="audio/mpeg")
