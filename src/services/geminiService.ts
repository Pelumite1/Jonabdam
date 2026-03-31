export async function getTravelAdvice(message: string, history: any[]) {
  const responses = ["That's great!", "Let me help!", "Wonderful choice!"];
  return responses[Math.floor(Math.random() * responses.length)];
}
