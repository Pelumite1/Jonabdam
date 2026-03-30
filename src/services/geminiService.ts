import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function getTravelAdvice(message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) {
  const model = "gemini-3-flash-preview";
  
  const chat = ai.chats.create({
    model,
    config: {
      systemInstruction: "You are a professional travel consultant for JONABDAM TRAVELS. You help families plan their dream vacations abroad. Be helpful, professional, and inspiring. Provide specific advice on destinations, documents like passports/visas, and travel tips.",
    },
  });

  // Reconstruct history if needed or just send message
  // For simplicity in this landing page, we'll use the chat object
  const result = await chat.sendMessage({ message });
  return result.text;
}
