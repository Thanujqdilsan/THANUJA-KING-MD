const { default: makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys')
const P = require('pino')
const fs = require('fs')
const path = require('path')
const config = require('./config')

async function connectToWhatsApp() {
  const { state, saveCreds } = await useMultiFileAuthState(path.resolve('./session'))

  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true,
    logger: P({ level: 'silent' }),
  })

  sock.ev.on('creds.update', saveCreds)
  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update
    if (connection === 'close') {
      let reason = new Boom(lastDisconnect?.error)?.output?.statusCode
      console.log('Connection closed. Reason:', reason)
      connectToWhatsApp()
    } else if (connection === 'open') {
      console.log('Bot connected successfully')
    }
  })

  // Plugin Loader
  const pluginFiles = fs.readdirSync('./plugins').filter(file => file.endsWith('.js'))
  for (const file of pluginFiles) {
    try {
      require(`./plugins/${file}`)(sock)
    } catch (err) {
      console.log(`Error in plugin ${file}:`, err)
    }
  }
}

connectToWhatsApp()
