// controller.js
const { generateAndStoreCombinations } = require('../services/combinationsService');

async function generateCombinationsController(req, res) {
  const { items, length } = req.body;

  if (!Array.isArray(items) || typeof length !== 'number') {
    return res.status(400).json({ message: "Invalid input format" });
  }

  try {
    const result = await generateAndStoreCombinations(items, length);
    res.json(result);
  } catch (error) {
    console.error("Error generating combinations:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

module.exports = {
  generateCombinationsController,
};
