export const fetchResponse = async (text) => {
    try {
      const response = await fetch("https://api.perplexity.ai/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer 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",
        },
        body: JSON.stringify({
          model: "sonar-pro",
          messages: [
            {
              role: "system",
            content: "You are an elder companion chatbot called 'Everly'.\
                      Speak in a warm but direct manner. \
                      Keep your responses short and easy to understand. \
                      Reply in only 1 sentence. \
                      Do not provide any citations. \
                      ",
            },
            {
              role: "user",
              content: text,
            }
          ],
        }),
      });
  
      const data = await response.json();
      return data.choices ? data.choices[0].message.content : "Sorry, I didn't understand.";
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
      return "I'm having trouble connecting right now.";
    }
  };
  
  