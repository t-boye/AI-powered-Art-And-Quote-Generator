const express = require("express");
const openai = require("openai"); // Import OpenAI library
const cors = require("cors");

const app = express();
app.use(cors()); // Apply CORS middleware to all routes
app.use(express.json()); // Parse JSON bodies

const port = process.env.PORT || 3000; // Use environment variable for port (optional)

// Replace with your OpenAI API key (securely stored)
openai.apiKey = process.env.OPENAI_API_KEY;

async function generateImage(prompt) {
  try {
    const response = await openai.images.createVariation({
      model: "dall-e-2",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });
    return response.data.url; // Return the generated image URL
  } catch (error) {
    console.error("Error generating image:", error);
    throw new Error("Failed to generate image"); // Throw error for error handling
  }
}

// API Endpoint for Image Generation
app.post("/generate-image", async (req, res) => {
  const { prompt } = req.body; // Get prompt data from request body

  try {
    if (!prompt) {
      throw new Error("Prompt is required");
    }

    const imageUrl = await generateImage(prompt);

    res.json({ success: true, imageUrl });
  } catch (error) {
    console.error("Error generating image:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
