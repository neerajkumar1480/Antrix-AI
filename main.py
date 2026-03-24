from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse, StreamingResponse
import openai
import os
import shutil
from dotenv import load_dotenv

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

load_dotenv()

# Initialize OpenAI client
client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

@app.get("/")
async def root():
    return {"message": "FastAPI server is running"}

@app.post("/api/speech")
async def speech_to_text(audio: UploadFile = File(...)):
    try:
        # Save temp file
        temp_file_path = f"temp_{audio.filename}.webm"
        with open(temp_file_path, "wb") as buffer:
            shutil.copyfileobj(audio.file, buffer)
        
        # Transcribe with Whisper
        with open(temp_file_path, "rb") as audio_file:
            transcription = client.audio.transcriptions.create(
                model="whisper-1",
                file=audio_file
            )
        
        # Clean up
        os.remove(temp_file_path)
        
        return {"text": transcription.text}
    except Exception as e:
        if os.path.exists(temp_file_path):
            os.remove(temp_file_path)
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/generate-question")
async def generate_question(data: dict):
    answer = data.get("answer")
    if not answer:
        raise HTTPException(status_code=400, detail="No answer provided")
    
    try:
        completion = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": "You are an expert AI interview coach. The user will provide their answer to an interview question. Analyze their answer briefly and generate a relevant follow-up interview question to keep the conversation going seamlessly. Keep the generated question relatively concise."},
                {"role": "user", "content": answer}
            ],
        )
        question_text = completion.choices[0].message.content
        return {"question": question_text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/speak")
async def text_to_speech(data: dict):
    text = data.get("text")
    if not text:
        raise HTTPException(status_code=400, detail="No text provided")
    
    try:
        mp3_response = client.audio.speech.create(
            model="tts-1",
            voice="alloy",
            input=text,
        )
        
        # Stream the audio back
        return StreamingResponse(
            mp3_response.iter_bytes(),
            media_type="audio/mpeg"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
