// movie.js
const fetch = require('node-fetch')
module.exports = {
  command: ['movie','film'],
  description: 'Movie info/search (template)',
  async execute(m, { text }) {
    if (!text) return m.reply('Usage: .movie <title>')
    try {
      let api = `https://api.example.com/movie?title=${encodeURIComponent(text)}`
      let res = await fetch(api).then(r=>r.json())
      if (!res) return m.reply('Not found')
      m.reply(`Title: ${res.title}\nYear: ${res.year}\nPlot: ${res.plot}`)
    } catch (e) { m.reply('Error: '+ e.message) }
  }
}
