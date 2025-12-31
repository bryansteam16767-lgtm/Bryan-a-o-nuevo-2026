
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";

export class GeminiService {
  private static instance: GeminiService;
  private ai: GoogleGenAI;

  private constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  public static getInstance(): GeminiService {
    if (!GeminiService.instance) {
      GeminiService.instance = new GeminiService();
    }
    return GeminiService.instance;
  }

  // Get current event/news trivia for New Year's using Search Grounding
  async getNewYearTrivia(location: string): Promise<{ text: string; sources: any[] }> {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `What are the most anticipated global events or traditions for New Year's 2026 in ${location}? Give me 3 interesting facts.`,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      return {
        text: response.text || "No trivia found.",
        sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
      };
    } catch (error) {
      console.error("Search Grounding Error:", error);
      return { text: "Error fetching trivia.", sources: [] };
    }
  }

  // Analyze image
  async analyzeImage(base64: string, prompt: string): Promise<string> {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: {
          parts: [
            { inlineData: { mimeType: 'image/jpeg', data: base64 } },
            { text: prompt }
          ]
        }
      });
      return response.text || "No analysis generated.";
    } catch (error) {
      console.error("Analysis Error:", error);
      return "Error analyzing image.";
    }
  }

  // Edit image (generate content with image part)
  async editImage(base64: string, prompt: string): Promise<string | null> {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            { inlineData: { mimeType: 'image/jpeg', data: base64 } },
            { text: `Based on this photo, ${prompt}. Make it look like a festive New Year 2026 celebration.` }
          ]
        }
      });

      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
      return null;
    } catch (error) {
      console.error("Edit Error:", error);
      return null;
    }
  }

  // Veo Video Generation
  async generateVeoVideo(prompt: string, imageBase64?: string): Promise<string | null> {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      
      const config = {
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt,
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: '16:9'
        }
      };

      if (imageBase64) {
        (config as any).image = {
          imageBytes: imageBase64,
          mimeType: 'image/png'
        };
      }

      let operation = await ai.models.generateVideos(config as any);

      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 5000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (!downloadLink) return null;

      const videoResponse = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
      const blob = await videoResponse.blob();
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error("Veo Error:", error);
      return null;
    }
  }
}
