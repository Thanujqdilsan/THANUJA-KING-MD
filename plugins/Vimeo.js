// vimeo.js
const fetch = require('node-fetch')
module.exports = {
  command: ['vimeo'],
  description: 'Vimeo download (template)',
  async execute(m, { text }) {
    if (!text) return m.reply('Usage: .vimeo <vimeo_url>')
    try {
      let api = `https://api.example.com/vimeo?url=${encodeURIComponent(text)}`
      let res = await fetch(api).then(r=>r.json())
      if (!res || !res.url) return m.reply('Failed')
      await m.sendFile(res.url, 'vimeo.mp4', 'Vimeo Download ✅')
    } catch (e) { m.reply('Error: '+ e.message) }
  }
}
