import os
import openai
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Global OpenAI client configuration
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

if not OPENAI_API_KEY:
    raise ValueError("OPENAI_API_KEY is not set in the environment.")

client = openai.OpenAI(api_key=OPENAI_API_KEY)
