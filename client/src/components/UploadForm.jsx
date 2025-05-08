import React, { useState } from 'react';
import { uploadCSV } from '../services/api';

const UploadForm = ({ onResults }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append('file', file);

    try {
      setLoading(true);
      const res = await uploadCSV(formData);
      onResults(res.data);
    } catch (err) {
      alert('Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" accept=".csv" onChange={(e) => setFile(e.target.files[0])} />
      <button type="submit" disabled={loading}>
        {loading ? 'Uploading...' : 'Upload CSV'}
      </button>
    </form>
  );
};

export default UploadForm;