const mainMenu = `
*HELLO*
*╭─「 ᴄᴏᴍᴍᴀɴᴅꜱ ᴘᴀɴᴇʟ」*
*│◈ 𝚁𝙰𝙼 𝚄𝚂𝙰𝙶𝙴 -* 317.59MB / 31387MB
*│◈ 𝚁𝚄𝙽𝚃𝙸𝙼𝙴 -* 1 day, 6 hours, 26 minutes, 14 seconds
*╰──────────●●►*
╭──────────●●►
│⛵ *LIST MENU*
│   ───────
│ _1_   *MAIN*
│ _2_   *AI*
│ _3_   *SEARCH*
│ _4_   *DOWNLOAD*
│ _5_   *OWNER*
│ _6_   *CONVERT*
│ _7_   *GROUP*
│ _8_   *STICKER*
│ _9_   *GAME*
│ _10_   *MATHTOOL*
│ _11_   *CHANNEL*
╰───────────●●►

*🌟 Reply the Number you want to select*
`;

const menuOptions = {
    "1": "📂 MAIN Commands:\n• .help\n• .ping\n• .settings",
    "2": "🤖 AI Commands:\n• .gpt\n• .img\n• .ask",
    "3": "🔍 Search Commands:\n• .google\n• .ytsearch\n• .wiki",
    "4": "⬇️ Download Commands:\n• .song\n• .video\n• .doc",
    "5": "👑 Owner Commands:\n• .block\n• .unblock\n• .broadcast",
    "6": "🔄 Convert Commands:\n• .toimg\n• .tomp3\n• .sticker",
    "7": "👥 Group Commands:\n• .add\n• .kick\n• .promote",
    "8": "🎨 Sticker Commands:\n• .sticker\n• .stickergif",
    "9": "🎮 Game Commands:\n• .guess\n• .tictactoe\n• .quiz",
    "10": "➗ Math Tools:\n• .calc\n• .math",
    "11": "📢 Channel Commands:\n• .post\n• .channelinfo"
};

module.exports = {
    name: "listmenu",
    alias: ["menu2"],
    desc: "Show interactive list menu",
    category: "menu",
    start: async (m, { client }) => {
        // Send main menu
        await client.sendMessage(m.from, { text: mainMenu }, { quoted: m });

        // Wait for reply
        const collector = client.ev.on("messages.upsert", async (chatUpdate) => {
            try {
                const msg = chatUpdate.messages[0];
                if (!msg.message || msg.key.fromMe) return;
                const text = msg.message.conversation || msg.message.extendedTextMessage?.text || "";

                if (menuOptions[text]) {
                    await client.sendMessage(m.from, { text: menuOptions[text] }, { quoted: msg });
                    client.ev.off("messages.upsert", collector); // stop after one selection
                }
            } catch (err) {
                console.error(err);
            }
        });
    }
};
