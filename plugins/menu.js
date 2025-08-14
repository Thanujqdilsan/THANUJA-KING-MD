module.exports = (sock) => {
  sock.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0]
    if (!msg.message) return

    const text = msg.message.conversation || msg.message.extendedTextMessage?.text
    if (text === '.menu') {
      await sock.sendMessage(msg.key.remoteJid, { text: 'Hello! I am THANUVA-KING-MD bot.' }, { quoted: msg })
    }
  })
}
