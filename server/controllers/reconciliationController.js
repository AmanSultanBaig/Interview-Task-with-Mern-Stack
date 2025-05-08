const { reconcileData } = require('../services/reconciliationService');

const reconcileCSV = async (req, res) => {
  try {
    const filePath = req.file.path;
    const ledgerFields = ['account', 'amount', 'transactionDate'];  
    const result = await reconcileData(filePath, ledgerFields);

    res.json({
      headerMappings: result.headerMappings,
      mismatches: result.mismatches,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  reconcileCSV,
};
