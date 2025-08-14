
const fetch = require('node-fetch')
module.exports = {
  command: ['threads'],
  description: 'Download Threads post media (template)',
  async execute(m, { text }) {
    if (!text) return m.reply('Usage: .threads <post_url>')
    try {
      let api = `https://api.example.com/threads?url=${encodeURIComponent(text)}`
      let res = await fetch(api).then(r=>r.json())
      if (!res || !res.media) return m.reply('Failed')
      await m.sendFile(res.media, 'threads_media', 'Threads Download ✅')
    } catch (e) { m.reply('Error: '+ e.message) }
  }
}
