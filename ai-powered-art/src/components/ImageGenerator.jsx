import React, { useState } from "react";

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    setError(null); // Clear any previous errors

    try {
      const response = await fetch("http://localhost:3000/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error(
          `Image generation failed with status ${response.status}`
        );
      }

      const data = await response.json();

      if (data.success) {
        setImageUrl(data.imageUrl);
      } else {
        throw new Error(data.error || "Failed to generate image");
      }
    } catch (error) {
      console.error("Error generating image:", error);
      setError(
        "An error occurred while generating the image. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded-md mb-4">
      <h2 className="text-xl font-bold mb-2">Generate an Image</h2>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your image prompt"
          className="border border-gray-300 rounded-md p-2 mb-2"
        />
        <button
          type="submit"
          disabled={!prompt}
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700"
        >
          {isLoading ? "Generating..." : "Generate Image"}
        </button>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </form>
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Generated Image"
          className="w-full rounded-md"
        />
      )}
    </div>
  );
};

export default ImageGenerator;
