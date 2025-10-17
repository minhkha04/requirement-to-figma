import { GoogleGenAI } from "@google/genai";
import env from "./environment.config.js";

const GEMINI_API_KEY = env.GEMINI_API_KEY;

const geminiAi = new GoogleGenAI({ apiKey: GEMINI_API_KEY});

export default geminiAi;