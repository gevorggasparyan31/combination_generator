const addItemQuery = `INSERT INTO items (item_name) VALUES (?)`;
const getItemQuery = `SELECT id FROM items WHERE item_name = ?`;
const addCombinationQuery = `INSERT INTO combinations (combination) VALUES (?)`;
const addResponseQuery = `INSERT INTO responses (request_body, combination_ids) VALUES (?, ?)`;

module.exports = {
  addItemQuery,
  getItemQuery,
  addCombinationQuery,
  addResponseQuery,
};
