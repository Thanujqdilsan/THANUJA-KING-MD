const fetch = require('node-fetch')
module.exports = {
  command: ['ig','instagram'],
  description: 'Download Instagram post/reel (template)',
  async execute(m, { text }) {
    if (!text) return m.reply('Usage: .ig <instagram_url>')
    try {
      let api = `https://api.example.com/instagram?url=${encodeURIComponent(text)}`
      let res = await fetch(api).then(r=>r.json())
      if (!res || !res.media) return m.reply('No media found')
      for (let i=0;i<res.media.length;i++) {
        await m.sendFile(res.media[i].url, `ig_${i}`, 'Instagram Download ✅')
      }
    } catch (e) { m.reply('Error: '+ e.message) }
  }
    }
