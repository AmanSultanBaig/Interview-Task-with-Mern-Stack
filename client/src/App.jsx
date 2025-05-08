import React, { useState } from 'react';
import UploadForm from './components/UploadForm';
import ResultsTable from './components/ResultsTable';

function App() {
  const [mismatches, setMismatches] = useState([]);

  return (
    <div style={{ padding: 20 }}>
      <h1>Mini Reconciliation Engine</h1>
      <UploadForm onResults={(data) => setMismatches(data.mismatches)} />
      <hr />
      <ResultsTable mismatches={mismatches} />
    </div>
  );
}

export default App;