const express = require('express');
const multer = require('multer');
const { reconcileCSV } = require('../controllers/reconciliationController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), reconcileCSV);

module.exports = router;
