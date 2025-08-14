// video.js
module.exports = {
  command: ['video'],
  description: 'Generic video downloader (direct URL)',
  async execute(m, { text }) {
    if (!text) return m.reply('Usage: .video <url>')
    try {
      await m.sendFile(text, 'video.mp4', 'Video Download ✅')
    } catch (e) { m.reply('Error: '+ e.message) }
  }
}
