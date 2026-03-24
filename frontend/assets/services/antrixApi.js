import { ENDPOINTS } from '../../../shared/constants/api.js';

/**
 * Antrix API Client
 * 
 * Provides a unified interface for communicating with the Antrix Backend.
 */
export const AntrixApi = {
    /**
     * Sends audio to the backend for transcription (Whisper).
     * @param {Blob} audioBlob - The recorded audio blob.
     * @returns {Promise<string>} - The transcribed text.
     */
    async transcribeSpeech(audioBlob) {
        const formData = new FormData();
        formData.append('audio', audioBlob, 'speech.webm');

        try {
            const response = await fetch(ENDPOINTS.SPEECH_TO_TEXT, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) throw new Error('Speech transcription failed');
            
            const data = await response.json();
            return data.text;
        } catch (error) {
            console.error('AntrixApi Error (STT):', error);
            throw error;
        }
    },

    /**
     * Sends an answer to the backend to generate a follow-up question (GPT-4o).
     * @param {string} answer - The candidate's answer.
     * @returns {Promise<string>} - The generated follow-up question.
     */
    async generateFollowUp(answer) {
        try {
            const response = await fetch(ENDPOINTS.GENERATE_QUESTION, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ answer })
            });

            if (!response.ok) throw new Error('Question generation failed');

            const data = await response.json();
            return data.question;
        } catch (error) {
            console.error('AntrixApi Error (GPT):', error);
            throw error;
        }
    },

    /**
     * Sends text to the backend for speech synthesis (OpenAI TTS).
     * @param {string} text - The text to speak.
     * @returns {Promise<Response>} - The audio stream response.
     */
    async speakText(text) {
        try {
            const response = await fetch(ENDPOINTS.SPEAK, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text })
            });

            if (!response.ok) throw new Error('Speech synthesis failed');
            
            return response;
        } catch (error) {
            console.error('AntrixApi Error (TTS):', error);
            throw error;
        }
    }
};
