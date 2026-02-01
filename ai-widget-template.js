/**
 * AI SUPPORT WIDGET - CUSTOMER TEMPLATE
 * Created by: Khalid Mohamed (khalidiin12@gmail.com)
 * * CUSTOMIZATION INSTRUCTIONS:
 * 1. Update config object with customer's store information
 * 2. Save as: ai-widget-[storename].js
 * 3. Push to GitHub and get Raw URL
 */

(function() {
  'use strict';

  // ============================================
  // CONFIGURATION - CUSTOMIZE FOR EACH CUSTOMER
  // ============================================
  const config = {
    // Customer Store Details
    storeName: 'STORE_NAME_HERE',
    primaryColor: '#D4AF37',  // Gold - can change to customer's brand color
    position: 'bottom-right',  // Options: bottom-right, bottom-left, top-right, top-left
    welcomeMessage: '👋 Hi! How can I help you today?',
    
    // Customer's Business Information
    knowledgeBase: `
STORE INFO:
- Store Name: [CUSTOMER STORE NAME]
- We sell: [PRODUCTS/SERVICES]

SHIPPING:
- Nairobi: [X-X business days]
- Other counties: [X-X business days]
- Shipping cost: [Free over KES X, or KES X flat rate]
- Express shipping: [Available/Not available - KES X]

RETURNS:
- Return period: [X days]
- Conditions: [Unworn, with tags, etc.]
- Return shipping cost: [Who pays?]
- Non-returnable items: [Custom items, final sale, etc.]

PAYMENT METHODS:
- M-Pesa: [Yes/No - Number if yes]
- Credit/Debit Cards: [Yes/No]
- Bank Transfer: [Yes/No]
- Cash on Delivery: [Yes/No - where available]

CONTACT INFORMATION:
- Email: [customer email]
- Phone: [customer phone]
- WhatsApp: [customer whatsapp]
- Business Hours: [Mon-Sat 9am-6pm, etc.]

SPECIAL POLICIES:
- [Any unique policies, warranties, custom orders, etc.]
    `.trim()
  };

  // ============================================
  // WIDGET STYLES
  // ============================================
  const styles = `
    #ai-support-widget {
      position: fixed;
      ${config.position.includes('bottom') ? 'bottom: 20px;' : 'top: 20px;'}
      ${config.position.includes('right') ? 'right: 20px;' : 'left: 20px;'}
      z-index: 999999;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    .ai-widget-btn {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: linear-gradient(135deg, ${config.primaryColor} 0%, #B8941F 100%);
      border: none;
      color: #000;
      font-size: 28px;
      cursor: pointer;
      box-shadow: 0 8px 30px rgba(0,0,0,0.3);
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: pulse 2.5s infinite;
    }

    @keyframes pulse {
      0% { box-shadow: 0 8px 30px rgba(0,0,0,0.3), 0 0 0 0 rgba(212, 175, 55, 0.7); }
      70% { box-shadow: 0 8px 30px rgba(0,0,0,0.3), 0 0 0 20px rgba(212, 175, 55, 0); }
      100% { box-shadow: 0 8px 30px rgba(0,0,0,0.3), 0 0 0 0 rgba(212, 175, 55, 0); }
    }

    .ai-widget-btn:hover {
      transform: scale(1.15);
    }

    .ai-chat-window {
      display: none;
      position: absolute;
      ${config.position.includes('bottom') ? 'bottom: 80px;' : 'top: 80px;'}
      ${config.position.includes('right') ? 'right: 0;' : 'left: 0;'}
      width: 360px;
      height: 520px;
      background: white;
      border-radius: 20px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      flex-direction: column;
      overflow: hidden;
    }

    .ai-chat-window.open {
      display: flex;
      animation: slideUp 0.3s ease;
    }

    @keyframes slideUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .ai-chat-header {
      background: linear-gradient(135deg, ${config.primaryColor} 0%, #B8941F 100%);
      color: #000;
      padding: 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    .ai-chat-header h4 {
      margin: 0 0 6px 0;
      font-size: 18px;
      font-weight: 700;
    }

    .ai-chat-header p {
      margin: 0;
      font-size: 13px;
      opacity: 0.85;
      display: flex;
      align-items: center;
      gap: 6px;
      font-weight: 600;
    }

    .ai-status-dot {
      width: 8px;
      height: 8px;
      background: #10B981;
      border-radius: 50%;
      display: inline-block;
      animation: blink 2s infinite;
      box-shadow: 0 0 8px rgba(16, 185, 129, 0.6);
    }

    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.3; }
    }

    .ai-close-btn {
      background: none;
      border: none;
      color: rgba(0,0,0,0.7);
      font-size: 28px;
      cursor: pointer;
      padding: 0;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      line-height: 1;
    }

    .ai-close-btn:hover {
      transform: rotate(90deg);
      opacity: 1;
    }

    .ai-messages {
      flex: 1;
      padding: 20px;
      overflow-y: auto;
      background: #F8F9FA;
    }

    .ai-messages::-webkit-scrollbar {
      width: 6px;
    }

    .ai-messages::-webkit-scrollbar-thumb {
      background: #D1D5DB;
      border-radius: 3px;
    }

    .ai-message {
      margin-bottom: 16px;
      animation: messageSlide 0.3s ease;
    }

    @keyframes messageSlide {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .ai-message-bubble {
      padding: 12px 16px;
      border-radius: 14px;
      max-width: 85%;
      word-wrap: break-word;
      line-height: 1.5;
    }

    .ai-message.bot .ai-message-bubble {
      background: white;
      border: 1px solid #E5E7EB;
      box-shadow: 0 2px 6px rgba(0,0,0,0.05);
      color: #1F2937;
    }

    .ai-message.user {
      display: flex;
      justify-content: flex-end;
    }

    .ai-message.user .ai-message-bubble {
      background: linear-gradient(135deg, ${config.primaryColor} 0%, #B8941F 100%);
      color: #000;
      font-weight: 500;
      box-shadow: 0 2px 8px rgba(212, 175, 55, 0.3);
    }

    .ai-message-time {
      font-size: 11px;
      opacity: 0.6;
      margin-top: 6px;
    }

    .ai-typing {
      display: none;
      padding: 12px 16px;
      background: white;
      border: 1px solid #E5E7EB;
      border-radius: 14px;
      width: fit-content;
      box-shadow: 0 2px 6px rgba(0,0,0,0.05);
      margin-bottom: 16px;
    }

    .ai-typing.active {
      display: flex;
      gap: 5px;
      align-items: center;
    }

    .ai-typing-dot {
      width: 8px;
      height: 8px;
      background: #9CA3AF;
      border-radius: 50%;
      animation: typing 1.4s infinite;
    }

    .ai-typing-dot:nth-child(2) { animation-delay: 0.2s; }
    .ai-typing-dot:nth-child(3) { animation-delay: 0.4s; }

    @keyframes typing {
      0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }
      30% { opacity: 1; transform: translateY(-6px); }
    }

    .ai-input-area {
      padding: 16px;
      border-top: 1px solid #E5E7EB;
      background: white;
    }

    .ai-input-wrapper {
      display: flex;
      gap: 10px;
      align-items: center;
    }

    .ai-input {
      flex: 1;
      padding: 12px 16px;
      border: 1.5px solid #E5E7EB;
      border-radius: 24px;
      font-size: 14px;
      font-family: inherit;
      outline: none;
      transition: all 0.3s ease;
    }

    .ai-input:focus {
      border-color: ${config.primaryColor};
      box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.15);
    }

    .ai-input::placeholder {
      color: #9CA3AF;
    }

    .ai-send-btn {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: linear-gradient(135deg, ${config.primaryColor} 0%, #B8941F 100%);
      border: none;
      color: #000;
      font-size: 18px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      font-weight: bold;
      box-shadow: 0 2px 8px rgba(212, 175, 55, 0.3);
    }

    .ai-send-btn:hover {
      transform: scale(1.12);
      box-shadow: 0 4px 12px rgba(212, 175, 55, 0.4);
    }

    .ai-send-btn:active {
      transform: scale(0.95);
    }

    @media (max-width: 480px) {
      .ai-chat-window {
        width: calc(100vw - 40px);
        height: 85vh;
      }
    }
  `;

  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);

  // ============================================
  // CREATE WIDGET HTML
  // ============================================
  const widgetHTML = `
    <div id="ai-support-widget">
      <button class="ai-widget-btn" aria-label="Open chat">💬</button>
      <div class="ai-chat-window" role="dialog" aria-label="Chat window">
        <div class="ai-chat-header">
          <div>
            <h4>AI Support</h4>
            <p>
              <span class="ai-status-dot"></span>
              Online • Instant replies
            </p>
          </div>
          <button class="ai-close-btn" aria-label="Close chat">×</button>
        </div>
        <div class="ai-messages" role="log" aria-live="polite">
          <div class="ai-message bot">
            <div class="ai-message-bubble">
              ${config.welcomeMessage}
              <div class="ai-message-time">${new Date().toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'})}</div>
            </div>
          </div>
        </div>
        <div class="ai-typing">
          <div class="ai-typing-dot"></div>
          <div class="ai-typing-dot"></div>
          <div class="ai-typing-dot"></div>
        </div>
        <div class="ai-input-area">
          <div class="ai-input-wrapper">
            <input 
              type="text" 
              class="ai-input" 
              placeholder="Type your message..." 
              aria-label="Message input"
            />
            <button class="ai-send-btn" aria-label="Send message">➤</button>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', widgetHTML);

  // ============================================
  // WIDGET FUNCTIONALITY
  // ============================================
  const widget = document.getElementById('ai-support-widget');
  const widgetBtn = widget.querySelector('.ai-widget-btn');
  const chatWindow = widget.querySelector('.ai-chat-window');
  const closeBtn = widget.querySelector('.ai-close-btn');
  const sendBtn = widget.querySelector('.ai-send-btn');
  const input = widget.querySelector('.ai-input');
  const messagesDiv = widget.querySelector('.ai-messages');
  const typingIndicator = widget.querySelector('.ai-typing');

  function toggleChat() {
    chatWindow.classList.toggle('open');
    if (chatWindow.classList.contains('open')) {
      input.focus();
    }
  }

  widgetBtn.addEventListener('click', toggleChat);
  closeBtn.addEventListener('click', toggleChat);

  function addMessage(text, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `ai-message ${isUser ? 'user' : 'bot'}`;
    messageDiv.innerHTML = `
      <div class="ai-message-bubble">
        ${text}
        <div class="ai-message-time">${new Date().toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'})}</div>
      </div>
    `;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }

  async function sendMessage() {
    const message = input.value.trim();
    if (!message) return;

    addMessage(message, true);
    input.value = '';

    typingIndicator.classList.add('active');
    messagesDiv.scrollTop = messagesDiv.scrollHeight;

    try {
      // PROD BACKEND URL
      const BACKEND_URL = 'https://ai-widget-backend.vercel.app/api/chat';

      const response = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: message,
          storeName: config.storeName,
          knowledgeBase: config.knowledgeBase
        })
      });

      const data = await response.json();
      
      typingIndicator.classList.remove('active');

      if (data.choices && data.choices[0]) {
        const reply = data.choices[0].message.content;
        addMessage(reply);
      } else {
        throw new Error('Invalid response from AI');
      }

    } catch (error) {
      console.error('AI Error:', error);
      typingIndicator.classList.remove('active');
      addMessage('Sorry, I\'m having trouble connecting right now. Please email us directly or try again in a moment.');
    }
  }

  sendBtn.addEventListener('click', sendMessage);
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });

  console.log('✅ AI Support Widget loaded successfully by Khalid Mohamed');
})();