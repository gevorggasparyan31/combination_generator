const db = require('../database/db'); // Database connection setup
const { addItemQuery, getItemQuery, addCombinationQuery, addResponseQuery } = require('../database/queries');

// Save a unique item in the database
async function saveUniqueItem(connection, itemName) {
  const [existingItem] = await connection.execute(getItemQuery, [itemName]);
  if (existingItem.length === 0) {
    await connection.execute(addItemQuery, [itemName]);
  }
}

// Generate combinations based on rules
function createCombinations(items, length) {
  const result = [];
  const recurse = (path, start) => {
    if (path.length === length) {
      result.push([...path]);
      return;
    }
    for (let i = start; i < items.length; i++) {
      const item = items[i];
      if (!path.some(p => p[0] === item[0])) {
        path.push(item);
        recurse(path, i + 1);
        path.pop();
      }
    }
  };
  recurse([], 0);
  return result;
}

// Main function to handle combination generation and storage
async function generateAndStoreCombinations(items, length) {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();
    const itemNames = items.map((item, index) => String.fromCharCode(65 + index) + item);

    // Insert unique items
    for (const itemName of itemNames) {
      await saveUniqueItem(connection, itemName);
    }

    // Generate valid combinations
    const combinations = createCombinations(itemNames, length);

    // Insert combinations and get their IDs
    const combinationIds = [];
    for (const combination of combinations) {
      const [result] = await connection.execute(addCombinationQuery, [JSON.stringify(combination)]);
      combinationIds.push(result.insertId);
    }

    // Insert response with combination IDs
    const [response] = await connection.execute(addResponseQuery, [
      JSON.stringify({ items, length }),
      JSON.stringify(combinationIds),
    ]);

    await connection.commit();
    return { id: response.insertId, combination: combinations };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

module.exports = {
  generateAndStoreCombinations,
};
