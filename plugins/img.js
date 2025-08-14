// img.js
const fetch = require('node-fetch')
module.exports = {
  command: ['img','image'],
  description: 'Image search (returns first result)',
  async execute(m, { text }) {
    if (!text) return m.reply('Usage: .img <query>')
    try {
      let api = `https://api.example.com/image-search?q=${encodeURIComponent(text)}`
      let res = await fetch(api).then(r=>r.json())
      if (!res || !res[0]) return m.reply('No image found')
      await m.sendFile(res[0].url, 'image.jpg', 'Image result ✅')
    } catch (e) { m.reply('Error: '+ e.message) }
  }
}
