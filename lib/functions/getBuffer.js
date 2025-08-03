const fetch = require('node-fetch');

/**
 * Download a file buffer from a URL
 * @param {string} url - The file URL
 * @returns {Buffer} buffer
 */
module.exports = async function getBuffer(url, options = {}) {
  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`Failed to fetch ${url}`);
    const buffer = await res.buffer();
    return buffer;
  } catch (e) {
    console.error("❌ Error in getBuffer:", e);
    return null;
  }
};
