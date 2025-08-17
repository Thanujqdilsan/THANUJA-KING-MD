

const { makeWASocket, useMultiFileAuthState, DisconnectReason } = require("@whiskeysockets/baileys")
const P = require("pino")
const fs = require("fs")

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState("./auth_info")

    const sock = makeWASocket({
        logger: P({ level: "silent" }),
        printQRInTerminal: true,
        auth: state,
        browser: ["THANUJA-KING-MD", "Chrome", "1.0.0"],
    })

    // Connection status
    sock.ev.on("connection.update", (update) => {
        const { connection, lastDisconnect } = update
        if (connection === "close") {
            const reason = new Boom(lastDisconnect?.error)?.output.statusCode
            if (reason === DisconnectReason.badSession) {
                console.log("Bad Session File, Delete auth_info and Scan Again")
                startBot()
            } else if (reason === DisconnectReason.connectionClosed) {
                console.log("Connection closed, reconnecting...")
                startBot()
            } else if (reason === DisconnectReason.connectionLost) {
                console.log("Connection lost, reconnecting...")
                startBot()
            } else if (reason === DisconnectReason.loggedOut) {
                console.log("Device Logged Out. Please Scan Again.")
            } else {
                console.log("Unknown Disconnect Reason, Reconnecting...", reason)
                startBot()
            }
        } else if (connection === "open") {
            console.log("✅ Bot Connected Successfully!")
        }
    })

    // Save credentials
    sock.ev.on("creds.update", saveCreds)

    // Message handler
    sock.ev.on("messages.upsert", async ({ messages }) => {
        const m = messages[0]
        if (!m.message) return

        const msg = m.message.conversation || m.message.extendedTextMessage?.text || ""
        const from = m.key.remoteJid

        if (msg.toLowerCase() === "alive") {
            await sock.sendMessage(from, { text: "✅ I'm alive! THANUJA-KING-MD is running." })
        }

        if (msg.toLowerCase() === "menu") {
            await sock.sendMessage(from, { text: "📌 *THANUJA-KING-MD Commands Menu*\n\n- alive\n- menu\n- ping\n- sticker\n- gpt\n- more..." })
        }
    })
}

startBot()
