
const fetch = require('node-fetch')
module.exports = {
  command: ['pinterest','pin'],
  description: 'Pinterest search/download (template)',
  async execute(m, { text }) {
    if (!text) return m.reply('Usage: .pinterest <query or url>')
    try {
      let api = `https://api.example.com/pinterest?q=${encodeURIComponent(text)}`
      let res = await fetch(api).then(r=>r.json())
      if (!res || !res.url) return m.reply('Not found')
      await m.sendFile(res.url, 'pinterest_media', 'Pinterest Download ✅')
    } catch (e) { m.reply('Error: '+ e.message) }
  }
}
