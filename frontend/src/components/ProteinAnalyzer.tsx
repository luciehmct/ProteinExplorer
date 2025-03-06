import React, { useState } from "react";
import axios from "axios";

const ProteinAnalyzer: React.FC = () => {
  // State for user inputs
  const [structureId, setStructureId] = useState<string>("");
  const [detailLevel, setDetailLevel] = useState<"short" | "detailed">("detailed");
  const [language, setLanguage] = useState<"en" | "fr">("en");

  // State for results
  const [proteinData, setProteinData] = useState<object | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingData, setLoadingData] = useState<boolean>(false);
  const [loadingAnalysis, setLoadingAnalysis] = useState<boolean>(false);

  // Fetch protein data from backend
  // Fetch protein data from backend
  const fetchProteinData = async () => {
    setLoadingData(true);
    setError(null);
    
    try {
      console.log(`Fetching data for: ${structureId}`); // Vérifier si l'ID est bien envoyé
  
      const response = await axios.get(`http://127.0.0.1:8000/protein/${structureId}`);
      
      console.log("Backend response:", response.data); // Vérifier la réponse
  
      if (!response.data || Object.keys(response.data).length === 0) {
        throw new Error("No data returned from API");
      }
  
      setProteinData(response.data);
    } catch (err) {
      console.error("Fetch error:", err);
      if (err instanceof Error) {
        setError(`Failed to fetch protein data: ${err.message}`);
      } else {
        setError("Failed to fetch protein data: Unknown error occurred.");
      }
    } finally {
      setLoadingData(false);
    }
  };
  

  // Fetch analysis using OpenAI from backend
  const fetchProteinAnalysis = async () => {
    setError(null);
    setAnalysis(null);
    setLoadingAnalysis(true);

    if (!structureId) {
      setError("Please enter a valid Protein ID.");
      setLoadingAnalysis(false);
      return;
    }

    try {
      const response = await axios.get(`http://127.0.0.1:8000/protein/${structureId}/analyze`, {
        params: { detail_level: detailLevel, language: language },
      });

      // Set analysis from API response
      setAnalysis(response.data.analysis);
    } catch (err) {
      setError("Failed to fetch analysis. Please check the backend.");
    } finally {
      setLoadingAnalysis(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Protein Explorer</h1>

      {/* Protein ID Input */}
      <label className="block text-gray-700">Protein ID:</label>
      <input
        type="text"
        value={structureId}
        onChange={(e) => setStructureId(e.target.value)}
        className="w-full p-2 border rounded-lg mb-3"
        placeholder="Enter a protein ID (e.g., 100D)"
      />

      {/* Detail Level Selector */}
      <label className="block text-gray-700">Detail Level:</label>
      <select
        value={detailLevel}
        onChange={(e) => setDetailLevel(e.target.value as "short" | "detailed")}
        className="w-full p-2 border rounded-lg mb-3"
      >
        <option value="short">Short</option>
        <option value="detailed">Detailed</option>
      </select>

      {/* Language Selector */}
      <label className="block text-gray-700">Language:</label>
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as "en" | "fr")}
        className="w-full p-2 border rounded-lg mb-3"
      >
        <option value="en">English</option>
        <option value="fr">Français</option>
      </select>

      {/* Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={fetchProteinData}
          className="w-1/2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
          disabled={loadingData}
        >
          {loadingData ? "Fetching Data..." : "Display Data"}
        </button>

        <button
          onClick={fetchProteinAnalysis}
          className="w-1/2 bg-green-500 text-white p-2 rounded-lg hover:bg-green-600"
          disabled={loadingAnalysis}
        >
          {loadingAnalysis ? "Analyzing..." : "Analyze"}
        </button>
      </div>

      {/* Error Display */}
      {error && <p className="text-red-500 mt-3">{error}</p>}

      {/* Protein Data Display */}
      {proteinData && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <h2 className="text-lg font-bold">Protein Data:</h2>
          <pre className="whitespace-pre-wrap break-words">{JSON.stringify(proteinData, null, 2)}</pre>
        </div>
      )}

      {/* Analysis Display */}
      {analysis && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <h2 className="text-lg font-bold">Analysis:</h2>
          <p>{analysis}</p>
        </div>
      )}
    </div>
  );
};

export default ProteinAnalyzer;
