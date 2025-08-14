// download.js
module.exports = {
  command: ['download'],
  description: 'Alias for generic download',
  async execute(m, { text }) {
    if (!text) return m.reply('Usage: .download <url>')
    try {
      await m.sendFile(text, 'file', 'Downloaded ✅')
    } catch (e) { m.reply('Error: '+ e.message) }
  }
}
