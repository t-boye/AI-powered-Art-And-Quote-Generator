import React from "react";

const ArtDisplay = ({ imageUrl }) => {
  return (
    <div className="flex justify-center items-center h-full">
      {imageUrl ? (
        <img
          className="object-cover max-h-full rounded-lg shadow-md"
          src={imageUrl}
          alt="Generated Artwork"
        />
      ) : (
        <p className="text-center text-gray-500">Waiting for your artwork...</p>
      )}
    </div>
  );
};

export default ArtDisplay;
