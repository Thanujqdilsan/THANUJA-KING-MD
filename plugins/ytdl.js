// ytdl.js
const ytdl = require('ytdl-core')
module.exports = {
  command: ['ytdl','youtube','yt'],
  description: 'YouTube download using ytdl-core',
  async execute(m, { text }) {
    if (!text) return m.reply('Usage: .ytdl <youtube_url>')
    try {
      let info = await ytdl.getInfo(text)
      let format = ytdl.chooseFormat(info.formats, { quality: 'highestvideo' })
      await m.sendFile(format.url, `${info.videoDetails.title}.mp4`, 'YouTube Download ✅')
    } catch (e) { m.reply('Error: '+ e.message) }
  }
}
