const fetch = require('node-fetch')
module.exports = {
  command: ['fb','facebook'],
  description: 'Download Facebook video (template)',
  async execute(m, { text }) {
    if (!text) return m.reply('Usage: .fb <facebook_url>')
    try {
      // Replace with real FB downloader API
      let api = `https://api.example.com/facebook?url=${encodeURIComponent(text)}`
      let res = await fetch(api).then(r=>r.json())
      if (!res || !res.url) return m.reply('Download failed')
      await m.sendFile(res.url, 'facebook_video.mp4', 'Facebook Download ✅')
    } catch (e) {
      m.reply('Error: '+ e.message)
    }
  }
}
