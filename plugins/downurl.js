// downurl.js
module.exports = {
  command: ['downurl'],
  description: 'Download any direct URL',
  async execute(m, { text }) {
    if (!text) return m.reply('Usage: .downurl <url>')
    try {
      await m.sendFile(text, 'file', 'Downloaded file ✅')
    } catch (e) { m.reply('Error: '+ e.message) }
  }
}
