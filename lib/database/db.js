const fs = require('fs');
const path = './lib/database/database.json';

// Load data from JSON DB
const loadDB = () => {
  if (!fs.existsSync(path)) return {};
  try {
    return JSON.parse(fs.readFileSync(path));
  } catch (e) {
    console.error("❌ Failed to load DB:", e);
    return {};
  }
}

// Save data to JSON DB
const saveDB = (data) => {
  try {
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
  } catch (e) {
    console.error("❌ Failed to save DB:", e);
  }
}

module.exports = { loadDB, saveDB };
