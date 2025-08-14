
module.exports = {
  command: ['capcut'],
  description: 'CapCut template download (direct link)',
  async execute(m, { text }) {
    if (!text) return m.reply('Usage: .capcut <template_url>')
    try {
      await m.sendFile(text, 'capcut_template', 'CapCut Template ✅')
    } catch (e) { m.reply('Error: '+ e.message) }
  }
}
