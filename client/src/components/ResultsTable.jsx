import React from 'react';

const ResultsTable = ({ mismatches }) => {
  if (!mismatches?.length) return <p>No mismatches found.</p>;

  return (
    <table border="1" cellPadding="5">
      <thead>
        <tr>
          <th>Txn_ID</th>
          <th>Amount</th>
          <th>Paid_At</th>
          <th>Status</th>
          <th>Ref</th>
          <th>csvHeader</th>
          <th>ledgerField</th>
        </tr>
      </thead>
      <tbody>
        {mismatches.map((item, idx) => (
          <tr key={idx}>
            <td>{item.row.Txn_ID}</td>
            <td>{item.row.Amount}</td>
            <td>{item.row.Paid_At}</td>
            <td>{item.row.Status}</td>
            <td>{item.row.Ref}</td>
            <td>{item.csvHeader}</td>
            <td>{item.ledgerField}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ResultsTable;