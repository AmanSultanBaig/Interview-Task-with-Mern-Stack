const fastLevenshtein = require('fast-levenshtein');

const mapHeaders = (csvHeaders, ledgerFields) => {
  return csvHeaders.map(csvHeader => {
    let bestMatch = ledgerFields[0];
    let minDistance = fastLevenshtein.get(csvHeader, bestMatch);

    ledgerFields.forEach(field => {
      const distance = fastLevenshtein.get(csvHeader, field);
      if (distance < minDistance) {
        bestMatch = field;
        minDistance = distance;
      }
    });
    return { csvHeader, bestMatch };
  });
};

module.exports = { mapHeaders };