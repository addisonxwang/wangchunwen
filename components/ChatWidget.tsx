import React, { useState, useRef, useEffect } from 'react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';
import { Icon } from './Icon';

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hi! I'm an AI assistant. Ask me anything about my work or experience.", timestamp: new Date() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: inputValue, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const responseText = await sendMessageToGemini(userMsg.text);
      const aiMsg: ChatMessage = { role: 'model', text: responseText, timestamp: new Date() };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      const errorMsg: ChatMessage = { role: 'model', text: "Sorry, something went wrong.", timestamp: new Date(), isError: true };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      {/* Chat Window - Light Glass Style */}
      {isOpen && (
        <div className="pointer-events-auto mb-4 w-[90vw] md:w-[350px] h-[450px] backdrop-blur-2xl bg-white/70 border border-white/50 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-300">
          {/* Header */}
          <div className="p-4 bg-white/30 border-b border-white/20 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Icon name="Sparkles" className="text-yellow-500" size={16} />
              <span className="font-semibold text-sm text-slate-800">AI Assistant</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-slate-500 hover:text-slate-800 transition-colors"
            >
              <Icon name="X" size={18} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed backdrop-blur-sm shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-br-none' 
                      : 'bg-white/60 text-slate-700 rounded-bl-none border border-white/40'
                  } ${msg.isError ? 'border-red-300 bg-red-50 text-red-600' : ''}`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/60 border border-white/40 p-3 rounded-2xl rounded-bl-none flex items-center gap-2 backdrop-blur-sm">
                  <Icon name="Loader2" className="animate-spin text-slate-400" size={14} />
                  <span className="text-xs text-slate-500">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSendMessage} className="p-3 border-t border-white/20 bg-white/30 flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask me something..."
              className="flex-1 bg-white/50 border border-white/40 rounded-full px-4 py-2 text-sm text-slate-800 focus:outline-none focus:bg-white/80 focus:border-white/60 transition-all placeholder:text-slate-400"
            />
            <button 
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-blue-500/20"
            >
              <Icon name="Send" size={16} />
            </button>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto h-14 w-14 rounded-full bg-white/60 backdrop-blur-xl border border-white/50 text-slate-800 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] hover:scale-105 hover:bg-white/80 active:scale-95 transition-all duration-300 flex items-center justify-center group"
        aria-label="Toggle Chat"
      >
        {isOpen ? (
          <Icon name="X" className="group-hover:rotate-90 transition-transform duration-300" />
        ) : (
          <Icon name="MessageSquare" className="group-hover:-translate-y-0.5 transition-transform duration-300" />
        )}
      </button>
    </div>
  );
};