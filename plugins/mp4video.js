// mp4video.js
module.exports = {
  command: ['mp4video'],
  description: 'MP4 direct downloader',
  async execute(m, { text }) {
    if (!text) return m.reply('Usage: .mp4video <url>')
    try {
      await m.sendFile(text, 'video.mp4', 'MP4 Download ✅')
    } catch (e) { m.reply('Error: '+ e.message) }
  }
}
