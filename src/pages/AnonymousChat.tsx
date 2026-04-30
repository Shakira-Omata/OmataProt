import React, { useState, useRef, useEffect } from 'react';
import { Send, Shield, Lock, Info, Bot, User as UserIcon, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const QUICK_QUESTIONS = [
  "What are the signs of an STI?",
  "How do I talk to my partner about protection?",
  "Is my period normal?",
  "I feel really anxious lately."
];

const INITIAL_MESSAGE: Message = {
  id: '1',
  text: "Hi there! I'm your AI health assistant. This is a 100% anonymous, safe, and judgment-free space. You can ask any question about sexual health, relationships, or your body. How can I help you today?",
  sender: 'bot',
  timestamp: new Date()
};

const SYSTEM_PROMPT = `You are an empathetic, professional, and non-judgmental health assistant for SalamaHub, an SRHR platform for young people. Provide accurate, safe, and supportive information. Maintain confidentiality. If it's a medical emergency, advise seeking immediate professional help. Keep responses concise and conversational.`;

const AnonymousChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const newUserMsg: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMsg]);
    setInput('');
    setIsTyping(true);

    try {
      // Create a plain text prompt with conversation history for better AI understanding
      const history = messages
        .filter(m => m.id !== '1')
        .map(m => `${m.sender === 'user' ? 'User' : 'Assistant'}: ${m.text}`)
        .join('\n');
      
      const fullPrompt = `${SYSTEM_PROMPT}\n\n${history}\nUser: ${text}\nAssistant:`;

      // Using the stable GET endpoint for Pollinations AI to avoid the deprecation notice
      // We add ?model=openai and &json=false to get clean text results
      const url = `https://text.pollinations.ai/${encodeURIComponent(fullPrompt)}?model=openai&system=${encodeURIComponent(SYSTEM_PROMPT)}&json=false`;
      
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      let responseText = await response.text();
      
      // Clean up the response if it includes any weird prefixes
      responseText = responseText.replace(/^Assistant:\s*/i, '').trim();

      // If for some reason we still get the deprecation notice, we try a fallback model
      if (responseText.includes('Pollinations legacy text API')) {
        const fallbackUrl = `https://text.pollinations.ai/${encodeURIComponent(fullPrompt)}?model=mistral&json=false`;
        const fallbackResponse = await fetch(fallbackUrl);
        responseText = await fallbackResponse.text();
        responseText = responseText.replace(/^Assistant:\s*/i, '').trim();
      }

      const newBotMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, newBotMsg]);
    } catch (error: any) {
      console.error("AI Error:", error);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I'm having trouble connecting to the AI. Please try sending your message again.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-h-[800px] bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-blue-600 p-4 md:p-6 text-white flex items-center justify-between shadow-md z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
            <Shield size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight">Anonymous AI Chat</h1>
            <div className="flex items-center gap-2 text-blue-100 text-sm mt-1">
              <Lock size={14} />
              <span>100% Confidential & Secure</span>
            </div>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 p-3 flex items-start gap-3 text-sm text-blue-800 border-b border-blue-100">
        <Info size={18} className="shrink-0 mt-0.5" />
        <p>This is a safe space. We do not track your identity, IP address, or save your chat history once you leave this page.</p>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-50 space-y-6">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex items-end gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
              msg.sender === 'user' ? 'bg-primary text-white' : 'bg-white border border-slate-200 text-primary shadow-sm'
            }`}>
              {msg.sender === 'user' ? <UserIcon size={16} /> : <Bot size={16} />}
            </div>
            <div className={`max-w-[80%] md:max-w-[70%] rounded-2xl px-5 py-3.5 shadow-sm ${
              msg.sender === 'user' 
                ? 'bg-primary text-white rounded-br-sm' 
                : 'bg-white border border-slate-100 text-slate-800 rounded-bl-sm'
            }`}>
              <div className="leading-relaxed whitespace-pre-wrap">{msg.text}</div>
              <div className={`text-[10px] mt-2 opacity-70 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex items-end gap-3">
            <div className="w-8 h-8 rounded-full bg-white border border-slate-200 text-primary shadow-sm flex items-center justify-center shrink-0">
              <Bot size={16} />
            </div>
            <div className="bg-white border border-slate-100 rounded-2xl rounded-bl-sm px-5 py-4 shadow-sm flex items-center gap-2">
              <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-slate-100 p-4 md:p-6">
        {messages.length === 1 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {QUICK_QUESTIONS.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSend(q)}
                className="text-sm bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 px-4 py-2 rounded-full transition-colors whitespace-nowrap"
              >
                {q}
              </button>
            ))}
          </div>
        )}
        
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
          className="flex items-end gap-3"
        >
          <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question anonymously here..."
              className="w-full max-h-32 min-h-[56px] bg-transparent border-none focus:ring-0 resize-none p-4 outline-none"
              rows={1}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend(input);
                }
              }}
            />
          </div>
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="h-[56px] w-[56px] bg-primary hover:bg-primary/90 text-white rounded-2xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0 shadow-sm"
          >
            {isTyping ? <Loader2 size={24} className="animate-spin" /> : <Send size={24} />}
          </button>
        </form>
        <p className="text-center text-xs text-slate-400 mt-3">
          Replies are AI-generated for immediate support. For emergencies, please visit the <a href="/support" className="text-primary hover:underline">Support</a> page.
        </p>
      </div>
    </div>
  );
};

export default AnonymousChat;
