import React, { useState } from "react";
import { getFlags } from "../services/api";

const FlagChecker = () => {
  const [userId, setUserId] = useState("");
  const [region, setRegion] = useState("");
  const [flags, setFlags] = useState(null);
  const [error, setError] = useState(null);

  const checkFlags = async () => {
    try {
      const response = await getFlags(userId, region);
      setFlags(response.data);
      setError(null);
    } catch (err) {
      setFlags(null);
      setError("Error fetching flags");
    }
  };

  return (
    <div>
      <h2>Check Feature Flags</h2>
      <input
        type="text"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Region"
        value={region}
        onChange={(e) => setRegion(e.target.value)}
      />
      <button onClick={checkFlags}>Check Flags</button>

      {error && <div>{error}</div>}

      {flags && (
        <div>
          <h3>Flags:</h3>
          <pre>{JSON.stringify(flags, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default FlagChecker;
