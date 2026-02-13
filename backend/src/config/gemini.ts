import { GoogleGenerativeAI } from '@google/generative-ai';
import { env } from './env';

export const geminiClient = new GoogleGenerativeAI(env.GEMINI_API_KEY);
export const geminiModel = geminiClient.getGenerativeModel({ model: env.GEMINI_MODEL });

export const geminiConfig = {
  temperature: 0.7,
  topP: 0.8,
  topK: 40,
  maxOutputTokens: 1024,
  systemPrompt: `You are a movie recommendation expert. analyze the user's mood or situation and suggest appropriate movie genres.
Return ONLY a JSON array of genre names in lowercase. Available genres: action, adventure, animation, comedy, crime, documentary, drama, family, fantasy, horror, music, mystery, romance, science fiction, thriller, tv movie, war, western.

Example:
Input: "I'm feeling sad after a breakup"
Output: ["romance", "drama"]`,
};

export const analyzeMood = async (mood: string): Promise<string[]> => {
  try {
    const prompt = `Analyze this mood/situation and suggest 2-3 appropriate movie genres: "${mood}"`;
    
    const result = await geminiModel.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const genresMatch = text.match(/\[([^\]]+)\]/);
    if (genresMatch) {
      const genres = JSON.parse(genresMatch[0]);
      return Array.isArray(genres) ? genres : [];
    }
    
    return [];
  } catch (error) {
    console.error('Gemini API error:', error);
    return ['drama'];
  }
};
