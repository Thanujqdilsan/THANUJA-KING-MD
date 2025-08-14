
const fetch = require('node-fetch')
module.exports = {
  command: ['soundcloud'],
  description: 'SoundCloud track download (template)',
  async execute(m, { text }) {
    if (!text) return m.reply('Usage: .soundcloud <url>')
    try {
      let api = `https://api.example.com/soundcloud?url=${encodeURIComponent(text)}`
      let res = await fetch(api).then(r=>r.json())
      if (!res || !res.url) return m.reply('Failed')
      await m.sendFile(res.url, 'track.mp3', 'SoundCloud Download ✅')
    } catch (e) { m.reply('Error: '+ e.message) }
  }
}
