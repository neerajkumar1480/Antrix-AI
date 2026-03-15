/**
 * TextToSpeechService
 * Uses the browser's built-in Web Speech API (SpeechSynthesis) — no API key needed.
 */
export class TextToSpeechService {
  constructor() {
    this.utterance = null;
    this.synth = window.speechSynthesis;
  }

  speak(text) {
    return new Promise((resolve) => {
      this.stop(); // cancel any current speech
      this.utterance = new SpeechSynthesisUtterance(text);
      this.utterance.rate = 0.95;
      this.utterance.pitch = 1.0;
      this.utterance.volume = 1.0;

      // Try to pick a natural-sounding English voice
      const voices = this.synth.getVoices();
      const preferred = voices.find(v => v.lang.startsWith('en') && v.name.toLowerCase().includes('google'))
        || voices.find(v => v.lang.startsWith('en'))
        || voices[0];
      if (preferred) this.utterance.voice = preferred;

      this.utterance.onend = () => resolve();
      this.utterance.onerror = () => resolve(); // don't block interview on TTS error
      this.synth.speak(this.utterance);
    });
  }

  stop() {
    if (this.synth.speaking) this.synth.cancel();
  }
}
