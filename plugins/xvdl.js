
const fetch = require('node-fetch')
module.exports = {
  command: ['xvdl','xv'],
  description: 'XVideos download (template)',
  async execute(m, { text }) {
    if (!text) return m.reply('Usage: .xvdl <url>')
    try {
      let api = `https://api.example.com/xvideos?url=${encodeURIComponent(text)}`
      let res = await fetch(api).then(r=>r.json())
      if (!res || !res.url) return m.reply('Failed')
      await m.sendFile(res.url, 'xvideo.mp4', 'XVideos Download ✅')
    } catch (e) { m.reply('Error: '+ e.message) }
  }
}
