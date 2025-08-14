// twitter.js
const fetch = require('node-fetch')
module.exports = {
  command: ['twitter','tw'],
  description: 'Download X/Twitter media (template)',
  async execute(m, { text }) {
    if (!text) return m.reply('Usage: .twitter <tweet_url>')
    try {
      let api = `https://api.example.com/twitter?url=${encodeURIComponent(text)}`
      let res = await fetch(api).then(r=>r.json())
      if (!res || !res.url) return m.reply('Failed')
      await m.sendFile(res.url, 'twitter_media', 'Twitter Download ✅')
    } catch (e) { m.reply('Error: '+ e.message) }
  }
}
