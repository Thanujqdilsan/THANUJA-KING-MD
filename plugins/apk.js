// apk.js
const fetch = require('node-fetch')
module.exports = {
  command: ['apk'],
  description: 'Download APK (template)',
  async execute(m, { text }) {
    if (!text) return m.reply('Usage: .apk <app-name or url>')
    try {
      let api = `https://api.example.com/apk?query=${encodeURIComponent(text)}`
      let res = await fetch(api).then(r=>r.json())
      if (!res || !res.url) return m.reply('APK not found')
      await m.sendFile(res.url, `${res.title||'app'}.apk`, 'APK Download ✅')
    } catch (e) { m.reply('Error: '+ e.message) }
  }
}
