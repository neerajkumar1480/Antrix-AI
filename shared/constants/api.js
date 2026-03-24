/**
 * Antrix API Constants
 * 
 * Centralized configuration for frontend-to-backend communication.
 */

const IS_PRODUCTION = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';

// Base URL for API requests
// Adjust this to your Vercel deployment URL if needed
export const API_BASE_URL = IS_PRODUCTION 
    ? '/api' 
    : 'http://localhost:8000/api';

export const ENDPOINTS = {
    SPEECH_TO_TEXT: `${API_BASE_URL}/speech`,
    GENERATE_QUESTION: `${API_BASE_URL}/generate-question`,
    SPEAK: `${API_BASE_URL}/speak`
};
