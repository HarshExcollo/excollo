import React from "react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@mui/material";
import { IoChatbubble } from "react-icons/io5";
import { IoSend } from "react-icons/io5";
import ExcolloLogo from '../assets/logo/ExcolloWebsiteLogo.png';

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

const WEBHOOK_URL = "https://n8n-excollo.azurewebsites.net/webhook/196ada2d-956f-4c92-a3f6-ce59e1e254ce";
const SESSION_KEY = "excollo_chat_session_id";

// Utility to strip markdown
function stripMarkdown(text) {
  // Remove code blocks
  text = text.replace(/```[\s\S]*?```/g, '');
  // Remove inline code
  text = text.replace(/`([^`]+)`/g, '$1');
  // Remove bold/italic/strikethrough
  text = text.replace(/([*_~]{1,3})(\S.*?\S)\1/g, '$2');
  // Remove links but keep text
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1');
  // Remove images
  text = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '');
  // Remove headings
  text = text.replace(/^#+\s/gm, '');
  // Remove blockquotes
  text = text.replace(/^>\s?/gm, '');
  // Remove unordered/ordered list markers
  text = text.replace(/^\s*[-*+]\s+/gm, '');
  text = text.replace(/^\s*\d+\.\s+/gm, '');
  return text;
}

function formatBotMessage(text) {
  // Strip markdown first
  let plain = stripMarkdown(text);
  // Replace newlines with <br />
  return plain.replace(/\n/g, '<br />');
}

const ChatBotWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! I'm Harsh. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const messagesEndRef = useRef(null);
  const chatBoxRef = useRef(null);
  const textareaRef = useRef(null); // Add ref for textarea

  useEffect(() => {
    if (open) {
      const newSessionId = generateUUID();
      setSessionId(newSessionId);
      localStorage.setItem(SESSION_KEY, newSessionId);
    }
  }, [open]);

  useEffect(() => {
    const storedSessionId = localStorage.getItem(SESSION_KEY);
    if (storedSessionId) {
      setSessionId(storedSessionId);
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(event) {
      if (chatBoxRef.current && !chatBoxRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { from: "user", text: input };
    setMessages((msgs) => [...msgs, userMessage]);
    setInput("");
    setLoading(true);
    try {
      // Timeout logic for fetch
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Request timeout')), 30000);
      });
      const res = await Promise.race([
        fetch(WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: input, sessionId }),
        }),
        timeoutPromise
      ]);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      let botReply = null;
      if (Array.isArray(data) && data.length > 0 && data[0].output) {
        botReply = data[0].output;
      } else if (data.reply) {
        botReply = data.reply;
      } else if (data.response) {
        botReply = data.response;
      } else if (data.message) {
        botReply = data.message;
      } else if (data.text) {
        botReply = data.text;
      } else if (typeof data === 'string') {
        botReply = data;
      } else if (data.content) {
        botReply = data.content;
      } else {
        botReply = "I apologize, but I couldn't process that request. Could you please try again?";
      }
      setMessages((msgs) => [
        ...msgs,
        { from: "bot", text: botReply || "I apologize, but I couldn't process that request. Could you please try again?" },
      ]);
    } catch (error) {
      let errorMessage = "I'm experiencing some technical difficulties. Please try again in a moment.";
      if (error.message.includes('timeout')) {
        errorMessage = "The request timed out. Please check your connection and try again.";
      } else if (error.message.includes('Failed to fetch')) {
        errorMessage = "Network error. Please check your internet connection.";
      } else if (error.message.includes('HTTP error')) {
        errorMessage = `Server error (${error.message}). Please try again later.`;
      }
      setMessages((msgs) => [
        ...msgs,
        { from: "bot", text: errorMessage },
      ]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '24px'; // Always reset to single line first
      if (textareaRef.current.scrollHeight > 24) {
        textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
      }
    }
  }, [input]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <div style={{
      position: "fixed",
      bottom: 24,
      right: 24,
      zIndex: 9999,
      fontFamily: 'Inter, sans-serif',
    }}>
      {open ? (
        <div ref={chatBoxRef} style={{
          width: '25vw',
          height: '70vh',
          background: "linear-gradient(135deg, rgba(142, 84, 247, 0.15), rgba(51, 46, 108, 0.25), rgba(0, 0, 0, 0.95))",
          borderRadius: 24,
          boxShadow: "0 25px 50px rgba(0,0,0,0.55), 0 0 0 1px rgba(142, 84, 247, 0.3)",
          display: "flex",
          flexDirection: "column",
          border: "1px solid rgba(142, 84, 247, 0.4)",
          backdropFilter: "blur(20px)",
          position: "relative",
          overflow: "hidden"
        }}>
          {/* Glow effect */}
          <div style={{
            position: "absolute",
            top: -2,
            left: -2,
            right: -2,
            bottom: -2,
            borderRadius: 26,
            background: "linear-gradient(135deg, rgba(142, 84, 247, 0.3), rgba(51, 46, 108, 0.2), rgba(0, 0, 0, 0.1))",
            zIndex: -1,
            filter: "blur(8px)",
            opacity: 0.6
          }} />
          {/* Header */}
          <div style={{
            background: "transparent",
            color: "#fff",
            padding: "20px 24px",
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            fontWeight: 600,
            fontSize: 18,
            letterSpacing: 0.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid rgba(142, 84, 247, 0.3)"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: "#4ade80",
                boxShadow: "0 0 8px rgba(74, 222, 128, 0.6)"
              }} />
              <img src={ExcolloLogo} alt="Excollo Logo" style={{ height: 32, width: 'auto', display: 'block' }} />
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: "transparent",
                color: "#fff",
                fontSize: "1rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s ease",
                border: "none"
              }}
              aria-label="Close chatbot"
            >
              X
            </button>
          </div>
          {/* Messages */}
          <div style={{
            flex: 1,
            padding: "16px",
            overflowY: "auto", // Ensure messages area scrolls
            background: "linear-gradient(135deg, #181828 0%, #10101a 100%)",
            color: "#fff",
            fontSize: 15,
            lineHeight: 1.6,
            fontFamily: 'Inter, sans-serif',
          }}>
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  marginBottom: 10,
                  display: "flex",
                  justifyContent: msg.from === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    display: "inline-block",
                    background: msg.from === "user" 
                      ? "linear-gradient(135deg, rgba(142, 84, 247, 0.9), rgba(142, 84, 247, 0.7))"
                      : "linear-gradient(135deg, rgba(51, 46, 108, 0.6), rgba(30, 30, 50, 0.8))",
                    color: msg.from === "user" ? "#fff" : "#fff",
                    borderRadius: msg.from === "user" ? "20px 20px 4px 20px" : "20px 20px 20px 4px",
                    padding: "12px 18px",
                    maxWidth: 280,
                    wordBreak: "break-word",
                    fontWeight: 400,
                    boxShadow: msg.from === "user" 
                      ? "0 4px 12px rgba(142, 84, 247, 0.3)"
                      : "0 4px 12px rgba(0,0,0,0.2)",
                    border: msg.from === "user" 
                      ? "1px solid rgba(142, 84, 247, 0.4)"
                      : "1px solid rgba(51, 46, 108, 0.3)",
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  {msg.from === 'bot'
                    ? <span dangerouslySetInnerHTML={{ __html: formatBotMessage(msg.text) }} />
                    : msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: 16 }}>
                <div style={{
                  background: "linear-gradient(135deg, rgba(51, 46, 108, 0.6), rgba(30, 30, 50, 0.8))",
                  borderRadius: "20px 20px 20px 4px",
                  padding: "12px 18px",
                  color: "#D1D1E2",
                  border: "1px solid rgba(51, 46, 108, 0.3)"
                }}>
                  <div style={{ display: "flex", gap: 4 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#8E54F7", animation: "pulse 1.5s infinite" }} />
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#8E54F7", animation: "pulse 1.5s infinite 0.2s" }} />
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#8E54F7", animation: "pulse 1.5s infinite 0.4s" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          {/* Input Area */}
          <div style={{
            padding: "20px 24px 24px 24px",
            background: "linear-gradient(135deg, rgba(30, 30, 50, 0.8), rgba(0, 0, 0, 0.9))",
            borderBottomLeftRadius: 24,
            borderBottomRightRadius: 24,
            borderTop: "1px solid rgba(142, 84, 247, 0.2)"
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              minHeight: 40, // uniform input bar height
              background: "rgba(51, 46, 108, 0.3)",
              borderRadius: 16,
              padding: "8px",
              border: "1px solid rgba(142, 84, 247, 0.3)",
              position: 'relative',
            }}>
              {/* Custom Placeholder */}
              {input.length === 0 && !loading && (
                <span style={{
                  position: 'absolute',
                  left: 16,
                  right: 0,
                  top: 0,
                  bottom: 0,
                  display: 'flex',
                  alignItems: 'center',
                  color: 'rgba(255, 255, 255, 0.27)',
                  fontSize: 15,
                  pointerEvents: 'none',
                  fontFamily: 'inherit',
                  textAlign: 'left',
                  zIndex: 1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}>
                  Ask me anything about Excollo...
                </span>
              )}
              <textarea
                ref={textareaRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                style={{
                  flex: 1,
                  resize: "none",
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  color: "#D1D1E2",
                  fontSize: 15,
                  fontFamily: 'inherit',
                  lineHeight: "24px",
                  padding: "3px 6px",
                  overflow: 'hidden',
                }}
                disabled={loading}
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                style={{
                  background: 'transparent',
                  color: "#fff",
                  border: 'none',
                  borderRadius: 0,
                  padding: "8px 16px",
                  fontWeight: 600,
                  fontSize: 16,
                  cursor: loading || !input.trim() ? "not-allowed" : "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: 'none',
                  minWidth: 30
                }}
              >
                {loading ? "..." : <IoSend size={20} />}
              </button>
            </div>
            <div style={{
              fontSize: 11,
              color: "rgba(209, 209, 226, 0.6)",
              textAlign: "center",
              marginTop: 8
            }}>
              Powered by Excollo AI • Press Enter to send
            </div>
          </div>
        </div>
      ) : (
        <Button
          onClick={() => setOpen(true)}
          variant="contained"
          color="primary"
          sx={{
            position: "fixed",
            height: 60,
            width: 60,
            minWidth: 0,
            right: 24,
            bottom: 24,
            zIndex: 9999,
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.1)",
            boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 0,
            transition: "background 0.2s",
            '&:hover': {
              background: 'linear-gradient(180deg, #2579E3 0%, #8E54F7 100%)',
            },
          }}
          aria-label="Open Excollo AI Assistant"
        >
          <IoChatbubble size={30} />
        </Button>
      )}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default ChatBotWidget; 