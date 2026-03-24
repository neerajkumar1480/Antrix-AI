import shutil
import os
from fastapi import UploadFile, HTTPException
from backend.core.config import client

async def transcribe_speech(audio: UploadFile):
    """Transcribes audio file to text using OpenAI Whisper."""
    temp_file_path = f"temp_{audio.filename}.webm"
    try:
        with open(temp_file_path, "wb") as buffer:
            shutil.copyfileobj(audio.file, buffer)
        
        with open(temp_file_path, "rb") as audio_file:
            transcription = client.audio.transcriptions.create(
                model="whisper-1",
                file=audio_file
            )
        
        return transcription.text
    finally:
        if os.path.exists(temp_file_path):
            os.remove(temp_file_path)

async def generate_followup_question(answer: str):
    """Generates a relevant interview follow-up question using GPT-4o."""
    try:
        completion = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": "You are an expert AI interview coach. The user will provide their answer to an interview question. Analyze their answer briefly and generate a relevant follow-up interview question to keep the conversation going seamlessly. Keep the generated question relatively concise."},
                {"role": "user", "content": answer}
            ],
        )
        return completion.choices[0].message.content
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI generation failed: {str(e)}")

async def synthesize_speech(text: str):
    """Converts text to speech using OpenAI TTS."""
    try:
        response = client.audio.speech.create(
            model="tts-1",
            voice="alloy",
            input=text,
        )
        return response.iter_bytes()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"TTS synthesis failed: {str(e)}")
