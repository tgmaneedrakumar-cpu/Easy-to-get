
import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateChatResponse = async (history: { role: 'user' | 'model', parts: { text: string }[] }[], newMessage: string): Promise<string> => {
    try {
        const chat = ai.chats.create({
            model: 'gemini-2.5-flash',
            history: history,
            config: {
                systemInstruction: "You are Foodie, a friendly and helpful chatbot for FoodHub, an online food marketplace. Answer questions about food, recipes, and help users find what they're looking for on the platform. Keep your answers concise and friendly."
            }
        });
        const response = await chat.sendMessage({ message: newMessage });
        return response.text;
    } catch (error) {
        console.error("Error generating chat response:", error);
        return "Sorry, I'm having a little trouble right now. Please try again later.";
    }
};

export const generateFoodRecommendations = async (): Promise<string[]> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: "Suggest 3 unique and delicious food dishes that would be popular on a local food marketplace. For each dish, provide a very short, enticing description (10 words max). Format the response as a numbered list. Example: 1. Spicy Thai Green Curry - Aromatic and fiery curry with tender chicken."
        });
        const text = response.text;
        return text.split('\n').filter(line => line.trim().length > 0);
    } catch (error) {
        console.error("Error generating recommendations:", error);
        return ["Could not fetch recommendations at this time."];
    }
};

export const identifyFoodFromImage = async (base64Image: string, mimeType: string): Promise<{ name: string; description: string }> => {
    try {
        const imagePart = {
            inlineData: {
                data: base64Image,
                mimeType: mimeType,
            },
        };
        const textPart = {
            text: "Identify the food in this image. Provide a creative, marketable name for it and a short, enticing description (around 20-25 words) suitable for a food marketplace listing. Return the response as a JSON object with two keys: 'name' and 'description'."
        };

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [imagePart, textPart] },
            config: {
                responseMimeType: 'application/json'
            }
        });
        
        const text = response.text.trim();
        const parsedJson = JSON.parse(text);

        return {
            name: parsedJson.name || "AI Suggested Name",
            description: parsedJson.description || "AI Suggested Description"
        };
    } catch (error) {
        console.error("Error identifying food from image:", error);
        return {
            name: "",
            description: "Could not identify the food. Please enter details manually."
        };
    }
};
