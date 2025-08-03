/**
 * Delay execution for given milliseconds
 * @param {number} ms
 * @returns {Promise}
 */
module.exports = (ms) => new Promise(resolve => setTimeout(resolve, ms));
