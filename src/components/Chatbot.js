import React, { useEffect, useRef, useState } from "react";
import { fetchResponse } from "../api/fetchResponse";
import SpeechRecognitionComponent from "./SpeechRecognition";
import SpeechSynthesisComponent from "./SpeechSynthesis";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const chatEndRef = useRef(null); // Reference for auto-scrolling

  // Auto-scroll function
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to the bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const botIntroMessage =
    "Tap the Speak button or press the Spacebar to start talking. Speak clearly and loudly for the best experience.";

  useEffect(() => {
    addBotMessage(botIntroMessage);
  }, []);

  const addBotMessage = (text) => {
    setMessages((prev) => [...prev, { role: "bot", content: text }]);
    setTimeout(() => {
      setIsSpeaking(true);
      SpeechSynthesisComponent.speak(text, () => {
        setIsSpeaking(false);
      });
    }, 500);
  };

  const handleUserMessage = async (text) => {
    setMessages((prev) => [...prev, { role: "user", content: text }]);

    const response = await fetchResponse(text);
    addBotMessage(response);
  };

  return (
    <div className="chat-container">
      <h1 className="title">👩‍🦰 EVERLY</h1>

      <div className="chat-box">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.role === "user" ? "user" : "bot"}`}
          >
            {msg.role === "user" ? "👤" : " 👩‍🦰 "} {msg.content}
          </div>
        ))}
        {/* Empty div to track scroll position */}
        <div ref={chatEndRef} />
      </div>

      <SpeechRecognitionComponent onResult={handleUserMessage} />
    </div>
  );
};

export default Chatbot;
