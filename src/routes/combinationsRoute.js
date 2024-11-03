const express = require('express');
const { generateCombinationsController } = require('../controllers/combinationsController');

const router = express.Router();

router.post('/generate', generateCombinationsController);

module.exports = router;
