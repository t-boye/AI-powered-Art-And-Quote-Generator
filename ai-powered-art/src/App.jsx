import React, { useState } from "react";
import "./index.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (data.success) {
        setImageUrl(data.imageUrl);
      } else {
        setError(data.error || "Failed to generate image");
      }
    } catch (error) {
      console.error("Error generating image:", error);
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-6">AI Art Generator</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt"
          className="border border-gray-300 rounded-md p-2 mb-4"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md"
        >
          {isLoading ? "Generating..." : "Generate Art"}
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {imageUrl && <img src={imageUrl} alt="Generated Art" className="mt-4" />}
    </div>
  );
}

export default App;
