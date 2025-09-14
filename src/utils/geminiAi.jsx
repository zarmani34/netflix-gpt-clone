import { GoogleGenerativeAI } from "@google/generative-ai";
import { AI_KEY } from "./urls";

const genAI = new GoogleGenerativeAI(AI_KEY);
export const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

