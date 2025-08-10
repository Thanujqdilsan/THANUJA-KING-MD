const settingsMenu = `
⚙️ _SETTINGS_

┌──────────────
├ *\`[1] AUTO_VOICE\`*
├─ 1.1 | Enable auto_voice 🔛
├─ 1.2 | Disable auto_voice 📴
├─ 1.3 | Auto_voice - customize 👨‍🔧
└──────────────
┌──────────────
├ *\`[2] AUTO_STICKER\`*
├─ 2.1 | Enable auto_sticker 🔛
├─ 2.2 | Disable auto_sticker 📴
├─ 2.3 | Auto_sticker - customize 👨‍🔧
└──────────────
┌──────────────
├ *\`[3] AUTO_READ_STATUS\`*
├─ 3.1 | Enable auto_read_status 🔛
├─ 3.2 | Disable auto_read_status 📴
├─ 3.3 | auto_read_status with "💚" react
├─ 3.4 | auto_read_status with random react 🎲
├─ 3.5 | Disable auto status react 📴
└──────────────
┌──────────────
├ *\`[4] ALWAYS_ONLINE\`*
├─ 4.1 | Enable online_status_bot 🔛
├─ 4.2 | Disable online_status_bot 📴
└──────────────
┌──────────────
├ *\`[5] READ_MESSAGE\`*
├─ 5.1 | Enable blue tick to commands 🔛
├─ 5.2 | Enable blue tick to all messages 🔛
├─ 5.3 | Disable blue tick to all messages 📴
└──────────────
┌──────────────
├ *\`[6] MOVIE-DL\`*
├─ 6.1 | Movie-Download _ true 🔛
├─ 6.2 | Movie-Download _ false 📴
└──────────────
┌──────────────
├ *\`[7] WORK_TYPE\`*
├─ 7.1 | Set work_type to private 👤
├─ 7.2 | Set work_type to inbox 👥
├─ 7.3 | Work-only in groups 🫂
├─ 7.4 | Work groups and inbox (public) 👥🫂
└──────────────
┌──────────────
├ *\`[8] BOT_LANGUAGE\`*
├─ 8.1 | Set language to english 🇬🇧
├─ 8.2 | Set language to sinhala 🇱🇰
└──────────────
┌──────────────
├ *\`[9] INBOX_AUTO_BLOCK\`*
├─ 9.1 | Set auto-block to true 🔛
├─ 9.2 | Set auto-block to false 📴
├─ 9.3 | with-command ⛓️
├─ 9.4 | without-command 🩹
└──────────────
┌──────────────
├ *\`[10] XVDL-DL\`*
├─ 10.1 | Xvideo-Download _ true 🔛
├─ 10.2 | Xvideo-Download _ false 📴
└──────────────
┌──────────────
├ *\`[11] AUTO_REACT\`*
├─ 11.1 | Set auto-react to true 🔛
├─ 11.2 | Set auto-react to false 📴
└──────────────
┌──────────────
├ *\`[12] USER_REACT\`*
├─ 12.1 | Set user-react to true 🔛
├─ 12.2 | Set user-react to false 📴
└──────────────
┌──────────────
├ *\`[13] COMPOSING\`*
├─ 13.1 | Set composing to true 🔛
├─ 13.2 | Set composing to false 📴
└──────────────
┌──────────────
├ *\`[14] CHATBOT\`*
├─ 14.1 | Set chatbot _ true 🔛
├─ 14.2 | Set chatbot _ false 📴
└──────────────
┌──────────────
├ *\`[15] ANTI_DELETE\`*
├─ 15.1 | Enable anti_delete 🔛
├─ 15.2 | Disable anti_delete 📴
├─ 15.3 | Enable anti_delete Only inbox 👤
├─ 15.4 | Enable anti_delete Only groups 👥
├─ 15.5 | Enable anti_delete inbox & groups 🫂
└──────────────
`;

module.exports = {
    name: "settings",
    alias: ["setmenu"],
    desc: "Show bot settings menu",
    react: "⚙️",
    category: "menu",
    start: async (m, { client }) => {
        await client.sendMessage(m.from, { text: settingsMenu }, { quoted: m });
    }
};
