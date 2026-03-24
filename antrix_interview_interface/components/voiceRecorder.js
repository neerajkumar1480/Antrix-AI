/**
 * VoiceRecorder — robust push-to-talk mic button
 *
 * Fixes applied:
 *  1. Button disabled state is fully cleared on enable() — both attribute + CSS
 *  2. Handles stt-auto-ended: if Chrome stops recognition mid-recording,
 *     we auto-submit the answer instead of leaving the UI stuck
 *  3. Guards against double-clicks with a processing lock
 */
export class VoiceRecorder {
  constructor(buttonId, statusTextId, onRecordStart, onRecordStop) {
    this.button = document.getElementById(buttonId);
    this.statusText = document.getElementById(statusTextId);
    this.isRecording = false;
    this._processing = false;   // lock to prevent double-click
    this.onRecordStart = onRecordStart;
    this.onRecordStop = onRecordStop;

    this.button.addEventListener('click', () => this._handleClick());

    // Live interim transcript while mic is open
    window.addEventListener('stt-interim', (e) => {
      if (this.isRecording && e.detail) {
        this.statusText.textContent =
          `"${e.detail.slice(0, 50)}${e.detail.length > 50 ? '…' : ''}"`;
      }
    });

    // Chrome auto-stops recognition after a silence pause.
    // If that happens while we think we're still recording → auto-submit.
    window.addEventListener('stt-auto-ended', () => {
      if (this.isRecording && !this._processing) {
        console.log('[VoiceRecorder] Chrome auto-ended — auto-submitting answer');
        this._stop();
      }
    });
  }

  // ── Click handler ──────────────────────────────────────────────────────────
  async _handleClick() {
    // Ignore clicks while the button is disabled or we're already processing
    if (this.button.disabled || this._processing) return;

    if (this.isRecording) {
      await this._stop();
    } else {
      await this._start();
    }
  }

  // ── Start recording ────────────────────────────────────────────────────────
  async _start() {
    this._processing = true;
    this.statusText.textContent = 'Starting mic…';

    try {
      const ok = await this.onRecordStart();
      if (ok) {
        this.isRecording = true;
        this._setStyle('recording');
      } else {
        this.statusText.textContent = '❌ Mic denied — allow access & reload';
        this._setStyle('idle');
      }
    } catch (err) {
      console.error('[VoiceRecorder] start error:', err);
      this.statusText.textContent = '❌ Could not start mic';
      this._setStyle('idle');
    } finally {
      this._processing = false;
    }
  }

  // ── Stop recording ─────────────────────────────────────────────────────────
  async _stop() {
    if (this._processing) return;
    this._processing = true;
    this.isRecording = false;
    this._setStyle('processing');

    try {
      await this.onRecordStop();
    } catch (err) {
      console.error('[VoiceRecorder] stop error:', err);
    } finally {
      this._processing = false;
      // Note: interviewEngine will call enable() when it's ready
    }
  }

  // ── Visual states ──────────────────────────────────────────────────────────
  _setStyle(state) {
    // Clear all state classes first
    this.button.className =
      'w-14 h-14 rounded-full flex items-center justify-center shadow-md transition-all duration-300';

    if (state === 'recording') {
      this.button.classList.add('bg-red-500', 'text-white');
      this.button.style.animation = 'pulse-ring 1s ease-in-out infinite';
      this.button.innerHTML = '<span class="material-symbols-rounded text-3xl">stop_circle</span>';
      this.statusText.textContent = '🎙 Speaking… tap to submit';

    } else if (state === 'processing') {
      this.button.classList.add('bg-gray-200', 'text-gray-400');
      this.button.style.animation = '';
      this.button.innerHTML = '<span class="material-symbols-rounded text-3xl animate-spin">sync</span>';
      this.statusText.textContent = 'Processing…';

    } else if (state === 'disabled') {
      this.button.classList.add('bg-gray-100', 'text-gray-300');
      this.button.style.animation = '';
      this.button.innerHTML = '<span class="material-symbols-rounded text-3xl">mic_off</span>';

    } else {
      // idle — ready to record
      this.button.classList.add('bg-white', 'text-[#5F4A8B]',
        'hover:bg-purple-50', 'hover:scale-105', 'cursor-pointer',
        'ring-2', 'ring-[#5F4A8B]/20');
      this.button.style.animation = '';
      this.button.innerHTML = '<span class="material-symbols-rounded text-3xl">mic</span>';
      this.statusText.textContent = 'Tap mic to answer';
    }
  }

  // ── Public API ─────────────────────────────────────────────────────────────
  enable() {
    this.isRecording = false;
    this._processing = false;
    this.button.disabled = false;     // ← must clear BEFORE setting class
    this.button.removeAttribute('disabled');
    this._setStyle('idle');
    console.log('[VoiceRecorder] enabled ✅');
  }

  disable(reason) {
    this.isRecording = false;
    this._processing = false;
    this.button.disabled = true;
    this._setStyle('disabled');
    this.statusText.textContent = reason || 'Please wait…';
    console.log('[VoiceRecorder] disabled:', reason);
  }
}