export class ChatUI {
  constructor(containerId, transcriptContainerId) {
    this.container = document.getElementById(containerId);
    this.transcriptContainer = document.getElementById(transcriptContainerId);
    
    // UI Elements
    this.questionCounter = document.getElementById('question-counter');
    this.aiStatusIndicator = document.getElementById('ai-status');
    this.interimBubbleElem = null;
  }

  addMessage(role, text) {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `flex w-full mb-4 ${role === 'user' ? 'justify-end' : 'justify-start'}`;
    
    const bubble = document.createElement('div');
    bubble.className = `max-w-[75%] rounded-2xl p-4 shadow-md transition-all duration-300 transform ${
      role === 'user' 
        ? 'bg-[#5F4A8B] text-white rounded-br-none' 
        : 'bg-white/80 backdrop-blur text-gray-800 rounded-bl-none border border-gray-100'
    }`;
    
    // Start with opacity 0 for fade-in effect
    bubble.classList.add('opacity-0', 'translate-y-4');
    
    bubble.innerHTML = `
      <p class="text-[15px] leading-relaxed">${text}</p>
      <div class="text-xs mt-2 ${role === 'user' ? 'text-gray-200' : 'text-gray-400'} flex items-center gap-1">
        ${role === 'ai' ? '<span class="material-symbols-rounded text-[14px]">smart_toy</span> AI' : 'You'} &bull; ${timestamp}
      </div>
    `;
    
    messageDiv.appendChild(bubble);
    this.transcriptContainer.appendChild(messageDiv);
    
    // Smooth fade in
    requestAnimationFrame(() => {
      bubble.classList.remove('opacity-0', 'translate-y-4');
    });

    this.scrollToBottom();
  }

  updateInterimMessage(text) {
    if (!text || text.trim() === '') {
      this.removeInterimMessage();
      return;
    }

    if (!this.interimBubbleElem) {
      this.interimBubbleElem = document.createElement('div');
      this.interimBubbleElem.className = `flex w-full mb-4 justify-end`;
      
      this.interimBubbleElem.innerHTML = `
        <div class="max-w-[75%] rounded-2xl p-4 shadow-md bg-[#5F4A8B]/70 border border-[#5F4A8B]/50 text-white rounded-br-none italic backdrop-blur transition-all duration-200">
          <p class="text-[15px] leading-relaxed interim-text"></p>
          <div class="text-xs mt-2 text-gray-300 flex items-center gap-1">
            <span class="material-symbols-rounded text-[14px] animate-pulse">mic</span> Recording...
          </div>
        </div>
      `;
      this.transcriptContainer.appendChild(this.interimBubbleElem);
    }
    
    const p = this.interimBubbleElem.querySelector('.interim-text');
    p.textContent = text;
    this.scrollToBottom();
  }

  removeInterimMessage() {
    if (this.interimBubbleElem) {
      this.interimBubbleElem.remove();
      this.interimBubbleElem = null;
    }
  }

  showTypingIndicator() {
    this.typingDiv = document.createElement('div');
    this.typingDiv.className = 'flex w-full mb-4 justify-start typing-indicator-container';
    
    this.typingDiv.innerHTML = `
      <div class="bg-white/80 backdrop-blur rounded-2xl p-4 shadow-md rounded-bl-none border border-gray-100 flex gap-2 items-center">
        <div class="w-2 h-2 bg-[#5F4A8B] rounded-full animate-bounce"></div>
        <div class="w-2 h-2 bg-[#5F4A8B] rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
        <div class="w-2 h-2 bg-[#5F4A8B] rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
      </div>
    `;
    
    this.transcriptContainer.appendChild(this.typingDiv);
    this.scrollToBottom();
  }

  hideTypingIndicator() {
    if (this.typingDiv) {
      this.typingDiv.remove();
      this.typingDiv = null;
    }
  }

  updateQuestionCounter(current, total) {
    this.questionCounter.textContent = `Question ${current} / ${total}`;
  }

  updateAiStatus(status) {
    // Use global status updater if available
    if (typeof window.__updateStatus === 'function') {
      window.__updateStatus(status);
    }
    if (this.aiStatusIndicator) {
      const colors = { listening:'text-green-500', speaking:'text-blue-500', thinking:'text-purple-500', idle:'text-gray-400' };
      const icons  = { listening:'mic', speaking:'volume_up', thinking:'sync', idle:'smart_toy' };
      const labels = { listening:'Listening', speaking:'Speaking', thinking:'Thinking…', idle:'Idle' };
      const s = status || 'idle';
      this.aiStatusIndicator.innerHTML = `<span class="material-symbols-rounded text-sm ${colors[s]||colors.idle}">${icons[s]||icons.idle}</span><span class="text-sm font-medium ${colors[s]||colors.idle}">${labels[s]||'Idle'}</span>`;
    }
  }

  scrollToBottom() {
    this.container.scrollTop = this.container.scrollHeight;
  }
}
