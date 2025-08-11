const fetch = require("node-fetch");
module.exports = {
    command: "tiktok",
    info: "Download TikTok video",
    async run(m, { text }) {
        if (!text) return m.reply("📌 Usage: .tiktok <tiktok_url>");
        try {
            let res = await fetch(`https://api.tiklydown.me/api/download?url=${encodeURIComponent(text)}`);
            let json = await res.json();
            if (!json || !json.video) return m.reply("❌ Failed to download TikTok video.");
            m.reply({ video: { url: json.video } });
        } catch (err) {
            m.reply("❌ API Error");
        }
    }
};
