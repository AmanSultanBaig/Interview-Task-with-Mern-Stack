import React, { useState } from "react";
import { getResource } from "../services/api";

const RateLimitResource = () => {
  const [apiKey, setApiKey] = useState("");
  const [response, setResponse] = useState(null);

  const handleClick = async () => {
    console.log(apiKey)
    const result = await getResource(apiKey);
    setResponse(result);
  };

  return (
    <div>
      <h1>Access Resource</h1>
      <input
        type="text"
        placeholder="Enter API Key"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
      />
      <button onClick={handleClick}>Get Resource</button>

      {response && (
        <div>
          <h2>Response:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default RateLimitResource;
