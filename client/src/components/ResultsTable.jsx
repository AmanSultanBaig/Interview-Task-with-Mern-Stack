import React from 'react';

const ResultsTable = ({ mismatches }) => {
  if (!mismatches?.length) return <p>No mismatches found.</p>;

  return (
    <table border="1" cellPadding="5">
      <thead>
        <tr>
          {Object.keys(mismatches[0]).map((key) => (
            <th key={key}>{key}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {mismatches.map((row, idx) => (
          <tr key={idx}>
            {Object.values(row).map((val, j) => (
              <td key={j}>{val}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ResultsTable;