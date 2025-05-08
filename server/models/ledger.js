const mongoose = require('mongoose');

const ledgerSchema = new mongoose.Schema({
  account: String,
  amount: Number,
  transactionDate: Date,
});

module.exports = mongoose.model('Ledger', ledgerSchema);
