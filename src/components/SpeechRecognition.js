import React, { useEffect, useState } from "react";

const SpeechRecognitionComponent = ({ onResult }) => {
  const [listening, setListening] = useState(false);
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = "en-US";

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    onResult(transcript);
  };

  const startListening = () => {
    if (!listening) {
      setListening(true);
      recognition.start();
    }
  };

  recognition.onend = () => {
    setListening(false);
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === "Space" || event.key === " ") {
        event.preventDefault(); // Prevents scrolling when spacebar is pressed
        startListening();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [listening]);

  return (
    <button 
        className="speak-button"
        onClick={startListening} 
        disabled={listening}
    >
        {listening ? "🎙️ Listening..." : "🎤 Speak"}
    </button>
  );
};

export default SpeechRecognitionComponent;
