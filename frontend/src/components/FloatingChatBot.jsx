import React, { useState, useEffect, useRef } from "react";
import { askBot } from "../api/chatApi";

function FloatingChatBot() {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! I'm your Tryber Assistant. How can I help you today?" }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (open) {
      scrollToBottom();
    }
  }, [messages, open]);

  const sendMessage = async (e) => {
    if (e) e.preventDefault();
    if (!question.trim() || loading) return;

    const userMsg = { sender: "user", text: question };
    setMessages((prev) => [...prev, userMsg]);
    setQuestion("");
    setLoading(true);

    try {
      const res = await askBot(question);
      const botMsg = { sender: "bot", text: res.data.answer };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error("Chat error:", error);
      const errMsg = { sender: "bot", text: "Sorry, I'm having trouble connecting. Please try again later." };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">
      {/* Chat Window */}
      {open && (
        <div className="glass-card mb-4 w-80 md:w-96 h-[500px] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="p-4 border-b border-white/10 bg-indigo-600/20 backdrop-blur-md flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="font-semibold text-white">Fitness Assistant</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/60 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${m.sender === "user"
                      ? "bg-indigo-600 text-white rounded-tr-none"
                      : "bg-white/10 text-slate-200 border border-white/5 rounded-tl-none"
                    }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white/10 px-4 py-2 rounded-2xl rounded-tl-none border border-white/5">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form
            onSubmit={sendMessage}
            className="p-4 border-t border-white/10 bg-white/5"
          >
            <div className="flex gap-2">
              <input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask about fitness, gyms..."
                className="bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-indigo-500 flex-1 placeholder:text-slate-500"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white w-10 h-10 rounded-xl flex items-center justify-center transition-all shadow-lg shadow-indigo-600/20"
              >
                ➔
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-all duration-300 shadow-2xl relative group ${open
            ? "bg-slate-800 rotate-90 text-white border border-white/10"
            : "bg-indigo-600 text-white hover:scale-110 hover:shadow-indigo-600/40"
          }`}
      >
        {open ? "✕" : "💬"}
        {!open && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-slate-900 rounded-full"></span>
        )}

        {/* Tooltip */}
        {!open && (
          <div className="absolute right-full mr-4 px-3 py-1 bg-indigo-600 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            How can I help you?
          </div>
        )}
      </button>
    </div>
  );
}

export default FloatingChatBot;