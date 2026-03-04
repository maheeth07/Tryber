import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import dotenv from "dotenv";
dotenv.config();

const model = new ChatGoogleGenerativeAI({
  model: "gemini-1.5-flash",
  apiKey: process.env.GOOGLE_API_KEY || "AIzaSyCxbr8Ns0ncPh0SQd8i6sWRqwEfoKLpKHw",
  temperature: 0.7
});

export const simpleChat = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ message: "No question provided" });
    }

    const response = await model.invoke([
      new SystemMessage("You are Tryber's Fitness Assistant. Help users with gym-related queries, fitness tips, and platform navigation. Be friendly and professional. If you don't know something about Tryber specifically, answer as a general fitness expert."),
      new HumanMessage(question)
    ]);

    res.json({
      answer: response.content
    });

  } catch (error) {
    console.error("Chatbot Controller Error:", error);
    res.status(500).json({ message: "Chatbot encountered an issue. Please try again later." });
  }
};