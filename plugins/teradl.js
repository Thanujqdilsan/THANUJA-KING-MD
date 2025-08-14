
module.exports = {
  command: ['teradl','terabox'],
  description: 'Terabox direct download (template)',
  async execute(m, { text }) {
    if (!text) return m.reply('Usage: .teradl <url>')
    try {
      await m.sendFile(text, 'terabox_file', 'Terabox Download ✅')
    } catch (e) { m.reply('Error: '+ e.message) }
  }
}
