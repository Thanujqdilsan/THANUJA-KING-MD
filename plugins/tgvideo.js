// tgvideo.js
module.exports = {
  command: ['tgvideo','telegram'],
  description: 'Telegram video via direct file link',
  async execute(m, { text }) {
    if (!text) return m.reply('Usage: .tgvideo <direct_url>')
    try {
      await m.sendFile(text, 'tgvideo.mp4', 'Telegram Video ✅')
    } catch (e) { m.reply('Error: '+ e.message) }
  }
}
