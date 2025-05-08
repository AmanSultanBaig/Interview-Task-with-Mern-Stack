const Ledger = require("../models/ledger");

const saveLedgerRecord = async (record) => {
  try {
    const newRecord = new Ledger(record);
    await newRecord.save();
    return newRecord;
  } catch (error) {
    throw new Error("Error saving ledger record");
  }
};

module.exports = {
  saveLedgerRecord,
};
