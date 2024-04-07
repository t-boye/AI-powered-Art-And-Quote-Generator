import React, { useState, useEffect } from "react";
import axios from "axios";

const QuoteGenerator = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [error, setError] = useState(null);
  const fetchQuote = async () => {
    try {
      const response = await axios.request({
        method: "GET",
        url: "https://quotes-by-api-ninjas.p.rapidapi.com/v1/quotes",
        headers: {
          "X-RapidAPI-Key": "YOUR_API_KEY", // Replace with your actual API key
          "X-RapidAPI-Host": "quotes-by-api-ninjas.p.rapidapi.com",
        },
      });
      setQuote(response.data.quote); // Assuming quote property in response data
      setAuthor(response.data.author); // Assuming author property in response data
    } catch (error) {
      console.error("Error fetching quote:", error);
      if (error.response && error.response.status === 429) {
        // Rate limit reached, handle appropriately
        setError("Too many requests. Please try again later.");
      } else {
        setError("Failed to retrieve quote. Please try again.");
      }
    } finally {
      // Optional: Add a delay after each request (consider rate limit timeframe)
      setTimeout(() => {}, 5000); // Adjust delay based on API rate limits
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="bg-gray-100 p-4 rounded-md mb-4">
      <h2 className="text-xl font-bold mb-2">Generate a Random Quote</h2>
      <button
        type="button"
        onClick={fetchQuote}
        className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 w-full"
      >
        Generate Quote
      </button>
      {quote && (
        <div className="mt-4">
          <p className="text-lg font-light">{quote}</p>
          {author && <p className="text-gray-500 text-sm mt-1"> - {author}</p>}
        </div>
      )}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default QuoteGenerator;
