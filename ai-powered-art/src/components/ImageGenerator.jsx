import React, { useState, useEffect } from 'react';

const ImageGenerator = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGetRandomPhoto = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Replace with your actual Unsplash Access Key directly
      const accessKey = "YOUR_ACTUAL_UNSPLASH_ACCESS_KEY"; 

      const response = await fetch(
        `https://api.unsplash.com/photos/random?client_id=${accessKey}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch random photo with status ${response.status}`);
      }

      const data = await response.json();

      if (data) {
        setImageUrl(data.urls.regular);
      } else {
        throw new Error("Failed to retrieve random photo");
      }
    } catch (error) {
      console.error("Error fetching random photo:", error);
      setError(
        "An error occurred while fetching a random photo. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetRandomPhoto(); 
  }, []); 

  return (
    <div className="bg-gray-100 p-4 rounded-md mb-4">
      <h2 className="text-xl font-bold mb-2">Get a Random Photo</h2>
      <button
        type="button"
        disabled={isLoading}
        className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700"
        onClick={handleGetRandomPhoto}
      >
        {isLoading ? "Loading..." : "Get Random Photo"}
      </button>
      {imageUrl && (
        <img src={imageUrl} alt="Random Photo" className="w-full rounded-md mt-4" />
      )}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default ImageGenerator;