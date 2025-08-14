// ss.js
const fetch = require('node-fetch')
module.exports = {
  command: ['ss','screenshot'],
  description: 'Website screenshot (API template)',
  async execute(m, { text }) {
    if (!text) return m.reply('Usage: .ss <url>')
    try {
      let api = `https://api.example.com/screenshot?url=${encodeURIComponent(text)}`
      await m.sendFile(api, 'screenshot.png', 'Website Screenshot ✅')
    } catch (e) { m.reply('Error: '+ e.message) }
  }
}
