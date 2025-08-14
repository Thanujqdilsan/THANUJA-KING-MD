// song.js
const fetch = require('node-fetch')
module.exports = {
  command: ['song','mp3'],
  description: 'Download song (URL or query template)',
  async execute(m, { text }) {
    if (!text) return m.reply('Usage: .song <url or query>')
    try {
      if (/^https?:\\/\\//.test(text)) {
        await m.sendFile(text, 'song.mp3', 'Song Download ✅')
      } else {
        let api = `https://api.example.com/search-song?q=${encodeURIComponent(text)}`
        let res = await fetch(api).then(r=>r.json())
        if (!res || !res.url) return m.reply('Song not found')
        await m.sendFile(res.url, 'song.mp3', 'Song Download ✅')
      }
    } catch (e) { m.reply('Error: '+ e.message) }
  }
}
