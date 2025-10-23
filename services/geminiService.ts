import { GoogleGenAI, Type, Modality } from "@google/genai";
import { DnDRace, DnDClass, DnDAlignment, GeneratedCharacterData, CharacterStats } from '../types';
import { MODELS } from '../constants';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const characterSchema = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING, description: "The character's full name." },
    stats: {
      type: Type.OBJECT,
      description: "The character's 6 core stats (3-18).",
      properties: {
        strength: { type: Type.INTEGER },
        dexterity: { type: Type.INTEGER },
        constitution: { type: Type.INTEGER },
        intelligence: { type: Type.INTEGER },
        wisdom: { type: Type.INTEGER },
        charisma: { type: Type.INTEGER },
      },
      required: ["strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma"]
    },
    backstory: { type: Type.STRING, description: "A rich, detailed backstory for the character (3-4 paragraphs)." },
    appearance: { type: Type.STRING, description: "A detailed physical description of the character (1-2 paragraphs)." },
    portraitDescription: { type: Type.STRING, description: "A detailed visual prompt for an AI image generator to create a fantasy-style character portrait. Describe their face, expression, hair, clothing, and a simple background. E.g., 'Head and shoulders portrait of a rugged male dwarf fighter, grim expression, braided brown beard with iron rings, steel plate armor, fantasy painting style.'" }
  },
  required: ["name", "stats", "backstory", "appearance", "portraitDescription"],
};

export const generateCharacter = async (race: DnDRace, dndClass: DnDClass, alignment: DnDAlignment): Promise<GeneratedCharacterData> => {
  const prompt = `Generate a detailed Dungeons & Dragons 5th Edition character with the following attributes: Race: ${race}, Class: ${dndClass}, Alignment: ${alignment}. Provide a unique name, ability scores (between 3 and 18), a compelling backstory, a physical description, and a prompt for an image generator to create their portrait.`;

  try {
    const response = await ai.models.generateContent({
      model: MODELS.PRO,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: characterSchema,
        temperature: 0.9,
      },
    });
    
    const jsonString = response.text.trim();
    const data: GeneratedCharacterData = JSON.parse(jsonString);
    return data;
  } catch (error) {
    console.error("Error generating character:", error);
    throw new Error("Failed to generate character details from the model.");
  }
};

export const generatePortrait = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateImages({
        model: MODELS.IMAGEN,
        prompt: `Award-winning fantasy character portrait of (${prompt}), cinematic lighting, intricate details, high fantasy, digital painting`,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/png',
          aspectRatio: '1:1',
        },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
      return `data:image/png;base64,${base64ImageBytes}`;
    }
    throw new Error("No image was generated.");

  } catch (error) {
    console.error("Error generating portrait:", error);
    throw new Error("Failed to generate the character portrait.");
  }
};

export const editImage = async (base64ImageData: string, mimeType: string, prompt: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
          model: MODELS.FLASH_IMAGE,
          contents: {
            parts: [
              {
                inlineData: {
                  data: base64ImageData,
                  mimeType: mimeType,
                },
              },
              {
                text: prompt,
              },
            ],
          },
          config: {
              responseModalities: [Modality.IMAGE],
          },
        });

        const part = response.candidates?.[0]?.content?.parts?.[0];
        if (part && part.inlineData) {
            const base64ImageBytes: string = part.inlineData.data;
            return `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
        }
        
        throw new Error("No edited image was returned from the model.");

    } catch(error) {
        console.error("Error editing image:", error);
        throw new Error("Failed to edit the image.");
    }
};
