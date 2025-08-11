const { exec } = require("child_process");
module.exports = {
    command: "gitclone",
    info: "Clone a GitHub repository",
    async run(m, { text }) {
        if (!text) return m.reply("📌 Usage: .gitclone <repo_url>");
        m.reply("🔄 Cloning repository, please wait...");
        exec(`git clone ${text}`, (err, stdout, stderr) => {
            if (err) return m.reply("❌ Error cloning repository.");
            m.reply("✅ Repository cloned successfully!");
        });
    }
};
