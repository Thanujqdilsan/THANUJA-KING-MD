// spotify.js
const fetch = require('node-fetch')
module.exports = {
  command: ['spotify'],
  description: 'Spotify -> mp3 converter (requires service)',
  async execute(m, { text }) {
    if (!text) return m.reply('Usage: .spotify <spotify_url>')
    try {
      let api = `https://api.example.com/spotify?url=${encodeURIComponent(text)}`
      let res = await fetch(api).then(r=>r.json())
      if (!res || !res.url) return m.reply('Failed to fetch')
      await m.sendFile(res.url, 'spotify.mp3', 'Spotify Download ✅')
    } catch (e) { m.reply('Error: '+ e.message) }
  }
}
