import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

export async function getTravelAdvice(message: string, history: any[]) {
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: "You are a professional travel consultant for JONABDAM TRAVELS. You help families plan their dream vacations abroad. Be helpful, professional, inspiring, and specific. Provide advice on destinations, documents like passports/visas, and travel tips."
    });

    const chat = model.startChat({
      history: history.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }))
    });

    const result = await chat.sendMessage(message);
    return result.response.text();
  } catch (error) {
    console.error("Travel advice error:", error);
    return "I'm having trouble connecting to our travel assistant. Please try again in a moment.";
  }
}
