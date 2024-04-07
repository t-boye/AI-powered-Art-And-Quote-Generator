import React, { useState } from "react";
import "./index.css"; // Import CSS globally
import Header from "./components/Header";
import QuoteGenerator from "./components/QuoteGenerator";
import ImageGenerator from "./components/ImageGenerator";
import Button from "./components/Button";
import Footer from "./components/Footer";

function App() {
  const [activeGenerator, setActiveGenerator] = useState("quote"); // Initial state

  const handleQuoteClick = () => setActiveGenerator("quote");
  const handleImageClick = () => setActiveGenerator("image");

  return (
    <>
      <div className="app-content container space-y-4 mx-auto px-4 py-8">
        <Header />

        <div className="flex justify-center space-x-2  mb-4">
          <Button
            text="Generate Quote"
            onClick={handleQuoteClick}
            active={activeGenerator === "quote"}
          />
          <Button
            text="Generate Image"
            onClick={handleImageClick}
            active={activeGenerator === "image"}
          />
        </div>

        {activeGenerator === "quote" && <QuoteGenerator />}
        {activeGenerator === "image" && <ImageGenerator />}
      </div>
      <Footer />
    </>
  );
}

export default App;
