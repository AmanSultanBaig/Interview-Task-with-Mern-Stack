import React, { useState } from "react";
import UploadForm from "./components/UploadForm";
import ResultsTable from "./components/ResultsTable";
import FlagChecker from "./components/FlagChecker";
import { getResource } from "./services/api";

function App() {
  const [mismatches, setMismatches] = useState([]);
  const [apiKey, setApiKey] = useState("");
  const [rateLimitResponse, setRateLimitResponse] = useState(null);

  // Function to handle resource access with rate-limiting
  const handleRateLimitCheck = async () => {
    const result = await getResource(apiKey);
    setRateLimitResponse(result);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Feature Flag Demo</h1>
      <FlagChecker />

      <hr />

      <h1>Sliding-Window Rate Limiter</h1>

      {/* API Key Input */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter API Key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          style={{ padding: "8px", marginRight: "10px" }}
        />
        <button onClick={handleRateLimitCheck} style={{ padding: "8px" }}>
          Check Resource Access
        </button>
      </div>

      {/* Display Rate Limit Response */}

      {rateLimitResponse && (
        <div style={{ marginBottom: "20px" }}>
          <h3>Rate Limit Response:</h3>
          <pre>{JSON.stringify(rateLimitResponse, null, 2)}</pre>
        </div>
      )}

      <hr />

      <h1>Mini Reconciliation Engine</h1>

      {/* UploadForm Component for CSV Upload */}
      <UploadForm onResults={(data) => setMismatches(data.mismatches)} />

      <hr />

      {/* ResultsTable Component to Show Mismatches */}
      <ResultsTable mismatches={mismatches} />
    </div>
  );
}

export default App;
