// mediafire.js
module.exports = {
  command: ['mediafire'],
  description: 'MediaFire download (direct/requiring resolver)',
  async execute(m, { text }) {
    if (!text) return m.reply('Usage: .mediafire <url>')
    try {
      await m.sendFile(text, 'mediafire_file', 'MediaFire Download ✅')
    } catch (e) { m.reply('Error: '+ e.message) }
  }
}
