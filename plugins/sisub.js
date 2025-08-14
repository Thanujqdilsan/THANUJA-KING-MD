
const fetch = require('node-fetch')
module.exports = {
  command: ['sisub','subtitle'],
  description: 'Subtitle download (template)',
  async execute(m, { text }) {
    if (!text) return m.reply('Usage: .sisub <movie title or url>')
    try {
      let api = `https://api.example.com/subtitle?q=${encodeURIComponent(text)}`
      await m.sendFile(api, 'subs.srt', 'Subtitle Download ✅')
    } catch (e) { m.reply('Error: '+ e.message) }
  }
}
