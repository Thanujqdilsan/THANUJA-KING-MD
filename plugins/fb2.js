
const fetch = require('node-fetch')
module.exports = {
  command: ['fb2'],
  description: 'FB2 ebook download (template)',
  async execute(m, { text }) {
    if (!text) return m.reply('Usage: .fb2 <query or url>')
    try {
      let api = `https://api.example.com/ebook?format=fb2&q=${encodeURIComponent(text)}`
      let res = await fetch(api).then(r=>r.json())
      if (!res || !res.url) return m.reply('Not found')
      await m.sendFile(res.url, 'book.fb2', 'FB2 ebook ✅')
    } catch (e) { m.reply('Error: '+ e.message) }
  }
}
