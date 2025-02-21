const SpeechSynthesisComponent = {
  speak: (text) => {
    const synth = window.speechSynthesis;
    const speech = new SpeechSynthesisUtterance(text);

    // Set voice settings
    speech.lang = "en-SG"; // Singapore English
    speech.rate = 1.1;  // 
    speech.pitch = 1.2; // Slightly higher pitch for a female voice
    speech.volume = 1.0; // Full volume

    // Function to set the correct voice once voices are available
    const setVoiceAndSpeak = () => {
      const voices = synth.getVoices();

      const singaporeVoice = voices.find(
        (voice) =>
          voice.lang === "en-SG" ||
          (voice.lang.startsWith("en") && voice.name.includes("Female")) ||
          voice.name.toLowerCase().includes("singapore")
      );

      if (singaporeVoice) {
        speech.voice = singaporeVoice;
        console.log(`Using voice: ${singaporeVoice.name}`);
      } else {
        console.warn("Singaporean voice not found, using default.");
      }

      synth.speak(speech);
    };

    // Ensure voices are loaded before speaking
    if (synth.getVoices().length > 0) {
      setVoiceAndSpeak();
    } else {
      // If voices are not loaded yet, wait for them
      synth.onvoiceschanged = setVoiceAndSpeak;
    }
  },
};

export default SpeechSynthesisComponent;
