import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.LLMAPIKEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

/**
 * Function to generate a response for a given message using the provided prompt
 * @param {string} message - The user's input or query.
 * @returns {Promise<string>} - The generated reply.
 */
export const generateHealthResponse = async (message) => {
  const prompt = `
        "You're a doctor's nurse and you're confident about it"
        "Answer the health-related query in simple language within 1-2 sentences."
        "Ask only 3-4 general questions about symptoms and note them. Don't answer them and say the doctor will contact you at your registered number."
        "And this is important: don't say the patient should contact the doctor; instead, say the doctor will contact them at their registered number."
  `;

  try {
    const finalPrompt = `${prompt}\nUser message: "${message}"`;
    const result = await model.generateContent(finalPrompt);
    return result.response.text();
  } catch (error) {
    console.error("Error generating response:", error);
    return "Sorry, an error occurred while generating the response.";
  }
};
