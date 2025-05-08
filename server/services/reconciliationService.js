const { parseCSV } = require('./csvService');
const { saveLedgerRecord } = require('./ledgerService');
const { mapHeaders } = require('../utils/headerMapper');

const reconcileData = async (filePath, ledgerFields) => {
  const csvData = await parseCSV(filePath);
  const headers = Object.keys(csvData[0]);
  const headerMappings = mapHeaders(headers, ledgerFields);
  const mismatches = [];

  for (const row of csvData) {
    let mismatchFound = false;
    const record = {};

    headerMappings.forEach(mapping => {
      const csvValue = row[mapping.csvHeader];
      const ledgerValue = record[mapping.bestMatch];

      if (csvValue !== ledgerValue) {
        mismatches.push({
          row,
          csvHeader: mapping.csvHeader,
          ledgerField: mapping.bestMatch,
        });
        mismatchFound = true;
      }
    });

    if (!mismatchFound) {
      await saveLedgerRecord(record);  // Save valid records to the ledger
    }
  }

  return { headerMappings, mismatches };
};

module.exports = {
  reconcileData,
};
