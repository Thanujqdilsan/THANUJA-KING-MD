
<p align="center">
  <img src="https://database.mizta-x.com/temp_links/1755157626010_1755157626010.image" width="200" alt="THANUJA-KING-MD

const fs = require("fs");
const os = require("os");
const path = require("path");
const { performance } = require("perf_hooks");

const BOT_NAME = process.env.BOT_NAME || "THANUJA-KING-MD";
const OWNER_NAME = process.env.OWNER_NAME || "Thanuja";
const ALIVE_TITLE = process.env.ALIVE_TITLE || "ALIVE MESSAGE";
const ALIVE_TAGLINE = process.env.ALIVE_TAGLINE || "Multidevice WhatsApp Bot is online ✅";
const ALIVE_FOOTER = process.env.ALIVE_FOOTER || "© " + BOT_NAME;

const LOCAL_ALIVE = path.join(__dirname, "../media/alive.png"); // put your logo here
const DEFAULT_ALIVE_URL =
  process.env.ALIVE_LOGO ||
  "https://raw.githubusercontent.com/absolutezero-xyz/static-assets/main/whatsapp-bot-defaults/thanuja-king-md-alive.png"; // fallback URL (change if you want)

function pickAliveImage() {
  try {
    if (fs.existsSync(LOCAL_ALIVE)) return { image: fs.readFileSync(LOCAL_ALIVE) };
  } catch {}
  // URL fallback
  return { image: { url: DEFAULT_ALIVE_URL } };
}

function bytesToMB(b) {
  return (b / 1024 / 1024).toFixed(2) + " MB";
}

function clock(ms) {
  const sec = Math.floor(ms / 1000) % 60;
  const min = Math.floor(ms / (60 * 1000)) % 60;
  const hr = Math.floor(ms / (60 * 60 * 1000));
  return `${hr}h ${min}m ${sec}s`;
}

module.exports = {
  name: "alive",
  alias: ["alive", "runtime", "ping", "status"],
  desc: "Shows bot status with an Alive card",
  category: "general",

  /**
   * @param {import('@adiwajshing/baileys').WASocket} sock
   * @param {import('@adiwajshing/baileys').proto.IWebMessageInfo & {chat?: string}} m
   * @param {{prefix:string,args:string[],isOwner:boolean}} ctx
   */
  run: async (sock, m, ctx = {}) => {
    try {
      const start = performance.now();
      // a tiny op just to get a time reference
      await sock.sendPresenceUpdate("composing", m.chat || m.key.remoteJid);
      const ping = (performance.now() - start).toFixed(0) + " ms";

      const memory = process.memoryUsage();
      const used = bytesToMB(memory.heapUsed);
      const total = bytesToMB(memory.heapTotal);

      const uptime = clock(process.uptime() * 1000);

      const cpuModel = os.cpus()?.[0]?.model || "Unknown CPU";
      const platform = `${os.type()} ${os.release()} (${os.arch()})`;

      const caption =
`*${BOT_NAME} — ${ALIVE_TITLE}*

*🟢 Status:* Online
*⚡ Ping:* ${ping}
*⏱ Uptime:* ${uptime}
*💾 RAM:* ${used} / ${total}
*🧠 CPU:* ${cpuModel}
*🖥 OS:* ${platform}

*👑 Owner:* ${OWNER_NAME}

${ALIVE_TAGLINE}

*Type:* .menu  |  .help
${ALIVE_FOOTER}`;

      const img = pickAliveImage();

      await sock.sendMessage(
        m.chat || m.key.remoteJid,
        {
          ...img,
          caption,
          contextInfo: {
            externalAdReply: {
              title: BOT_NAME,
              body: "Alive",
              mediaType: 1,
              thumbnailUrl: typeof img.image === "object" && img.image.url ? img.image.url : undefined,
              renderLargerThumbnail: true,
              sourceUrl: "https://github.com/", // optional: your repo/site
            },
            mentionedJid: [m.sender].filter(Boolean),
          },
        },
        { quoted: m }
      );
    } catch (e) {
      console.error("alive.js error:", e);
      // graceful fallback (text only)
      await sock.sendMessage(
        m.chat || m.key.remoteJid,
        { text: `✅ ${BOT_NAME} is online\nPing ok.\nUptime: ${clock(process.uptime() * 1000)}` },
        { quoted: m }
      );
    }
  },
};
