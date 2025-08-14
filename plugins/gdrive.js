// gdrive.js
module.exports = {
  command: ['gdrive','drive'],
  description: 'Send Google Drive file (direct link req.)',
  async execute(m, { text }) {
    if (!text) return m.reply('Usage: .gdrive <direct_file_url>')
    try {
      // If share link, convert to direct-download beforehand
      await m.sendFile(text, 'drive_file', 'Google Drive file ✅')
    } catch (e) { m.reply('Error: '+ e.message) }
  }
}
