export async function getTravelAdvice(message: string, history: any[]) {
  const responses = [
    "That sounds like an amazing destination! I'd love to help you plan every detail.",
    "Great choice! Let me share some expert tips for your trip.",
    "What a wonderful place to visit! Have you considered the best time to travel?",
    "I can definitely help you organize everything for a smooth trip.",
    "That's perfect for families! Let me suggest some must-see attractions."
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}
