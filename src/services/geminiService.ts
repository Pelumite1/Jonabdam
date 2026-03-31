export async function getTravelAdvice(message: string, history: any[]) {
  // Mock travel responses - no external dependencies needed
  const responses = [
    "That sounds like an amazing destination! I'd love to help you plan every detail of your family vacation.",
    "Great choice! Let me share some expert travel tips for your trip.",
    "What a wonderful place to visit! Have you considered the best time to travel there?",
    "I can definitely help you organize everything for a smooth and enjoyable journey.",
    "That's perfect for families! Let me suggest some must-see attractions and local experiences."
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}
