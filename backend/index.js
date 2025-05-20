import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import user_route from "./routes/userRoute.js";
import profileRoutes from "./routes/profileRoutes.js";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import kycRoutes from "./routes/kycRoutes.js";
import analytics_router from "./routes/adminRoutes.js";
import recommendRoutes from "./routes/recommendRoutes.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { jsonrepair } from "jsonrepair";
import generateRoutes from "./routes/campaignRoutes.js";

dotenv.config();

const app = express();
// const API_KEY = process.env.OPENAI_API_KEY; //This is for open AI
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use("/uploads", express.static("uploads")); // Serve uploaded images
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const port = process.env.PORT || 4000;

// DB Connection
connectDB();

// // OpenAI API Endpoint
// app.post("/campaign", async (req, res) => {
//   const options = {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${API_KEY}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       model: "gpt-3.5-turbo",
//       messages: [{ role: "assistant", content: req.body.message }],
//       max_tokens: 100,
//     }),
//   };

//   try {
//     const response = await fetch(
//       "https://api.openai.com/v1/chat/completions",
//       options
//     );
//     const data = await response.json();
//     res.send(data);
//   } catch (error) {
//     console.log(error);
//   }
// });


const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAi.getGenerativeModel({ model: "gemini-1.5-flash" });

const generate = async (prompt) => {
  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    console.log(text);
    return text;
  } catch (err) {
    console.error("Error generating content:", err);
    return "Error occurred";
  }
};

//TESTING

app.post("/campaign", async (req, res) => {
  try {
    const { description, persona, involvementType, audience, budget } =
      req.body;

    const prompt = `
You are a celebrity marketing AI expert. Based on the following campaign inputs, suggest the top 10 Indian influencers who are the best fit.

Return the result as a JSON array with these fields for each celebrity:
- name
- age
- gender
- location
- targetAudience
- brandAlignment
- imageMatch
- contentStyle
- publicImage
- followers
- engagementRate
- totalReach
- previousEndorsements
- averageROI
- pastPartnerships
- endorsementFee
- geographicLocation

Campaign Details:
Description: ${description || "Not provided"}
Desired Persona: ${persona || "Not specified"}
Involvement Type: ${involvementType || "Not specified"}
Target Audience: ${audience || "General audience"}
Budget: ${budget || "Not specified"}

Respond ONLY with JSON in this format:
{
  "suggested_actors": [
    {
      "name": "Name",
      "age": 0,
      "gender": "Male/Female",
      "location": "City",
      "targetAudience": "string",
      "brandAlignment": "string",
      "imageMatch": "string",
      "contentStyle": "string",
      "publicImage": "string",
      "followers": 0,
      "engagementRate": "string",
      "totalReach": "string",
      "previousEndorsements": "string",
      "averageROI": "string",
      "pastPartnerships": "string",
      "endorsementFee": "string",
      "geographicLocation": "string"
    }
  ]
}
`;

    const result = await generate(prompt);
    console.log("Gemini raw result:", result);

    const cleaned = result.replace(/```json|```/g, "").trim();
    const match = cleaned.match(/{[\s\S]*}/); // full JSON object

    if (!match) {
      return res.status(500).json({
        success: false,
        message: "Could not extract JSON from AI response",
        raw: cleaned,
      });
    }

    let repaired;
    try {
      repaired = jsonrepair(match[0]); //  auto-fix invalid JSON
    } catch (repairErr) {
      console.error("JSON repair failed:", repairErr);
      return res.status(500).json({
        success: false,
        message: "AI returned unrepairable JSON",
        raw: match[0],
      });
    }

    let parsed;
    try {
      parsed = JSON.parse(repaired);
    } catch (parseErr) {
      console.error("JSON parse still failed:", parseErr);
      return res.status(500).json({
        success: false,
        message: "Even repaired JSON could not be parsed",
        raw: repaired,
      });
    }

    if (!parsed || !Array.isArray(parsed.suggested_actors)) {
      return res.status(400).json({
        success: false,
        message: "Invalid format returned from AI",
        raw: parsed,
      });
    }

    return res.status(200).json({
      success: true,
      result: parsed,
    });
  } catch (error) {
    console.error("API error:", error);
    return res.status(500).json({
      success: false,
      error: error.message || "Internal Server Error",
    });
  }
});

// Routes
app.use("/api/user", user_route);
app.use("/api/user/profiles", profileRoutes);
app.disable("etag");
app.use("/api/kyc", kycRoutes);
app.use("/admin", analytics_router);
app.use("/api/recommend", recommendRoutes);
app.use("/api", generateRoutes);
app.use("/api/interest", analytics_router);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
