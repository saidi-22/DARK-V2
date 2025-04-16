const fs = require("fs-extra");
const os = require("os");
const moment = require("moment-timezone");
const { zokou } = require("../framework/zokou");
const { format } = require("../framework/mesfonctions");
const settings = require("../set");

const more = String.fromCharCode(8206);
const readmore = more.repeat(4001);

zokou(
  {
    nomCom: "menu",
    categorie: "General",
    reaction: "⚡",
  },
  async (dest, zk, options) => {
    const { ms, repondre, prefixe, nomAuteurMessage, mybotpic } = options;
    const { cm } = require("../framework/zokou");

    // Initial loading
    const loadingMsg = await zk.sendMessage(dest, { text: "⚡ Loading...\n▰▱▱▱▱▱▱▱▱▱ 10%" }, { quoted: ms });
    const updateProgress = async (percent) => {
      const filled = "▰".repeat(Math.floor(percent / 10));
      const empty = "▱".repeat(10 - Math.floor(percent / 10));
      await zk.sendMessage(dest, { text: `⚡ Loading...\n${filled}${empty} ${percent}%`, edit: loadingMsg.key }, { quoted: ms });
    };

    for (const p of [30, 50, 70, 100]) {
      await new Promise(res => setTimeout(res, 300));
      await updateProgress(p);
    }

    // Command categorization
    const categorized = {};
    cm.forEach(cmd => {
      if (!categorized[cmd.categorie]) categorized[cmd.categorie] = [];
      categorized[cmd.categorie].push(cmd.nomCom);
    });

    const mode = settings.MODE.toLowerCase() === "yes" ? "public" : "private";
    const timeNow = moment().tz("Africa/Nairobi").format("HH:mm:ss");
    const ramUsage = `${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}`;

    // Menu Header
    const header = `
╭━〔 𝐃𝐀𝐑𝐊-𝐌𝐃 𝐕² 〕━⭓
┃ ✦ Owner: @254107065646
┃ ✦ Mode: ${mode}
┃ ✦ Time: ${timeNow} (EAT)
┃ ✦ RAM: ${ramUsage}
╰━━━━━━━━━━━━━━━⭓
`;

    // Command List
    let menuBody = `✦ Use *${prefixe}help <cmd>* for details\n`;
    const icons = {
      General: "⚙",
      Group: "👥",
      Mods: "🛡️",
      Fun: "🎮",
      Search: "🔎",
      Logo: "🎨",
      Utilities: "🛠",
    };

    for (const cat in categorized) {
      const icon = icons[cat] || "✨";
      menuBody += `\n╭─⊷ ${icon} ${cat.toUpperCase()} ${icon}\n`;
      categorized[cat].forEach(cmd => {
        menuBody += `┃ • ${cmd}\n`;
      });
      menuBody += `╰───────────────⭓\n`;
    }

    // Footer
    const footer = `
╭═〔 𝐃𝐄𝐕𝐄𝐋𝐎𝐏𝐄𝐑𝐒 〕═⭓
┃ @254107065646 (DARK TECH)
╰═════════════════⭓
`;

    // Load media
    const media = mybotpic(); // video/gif/image
    const mentions = ["254107065646@s.whatsapp.net"];

    // Final Message
    await zk.sendMessage(dest, {
      text: "✅ Menu Loaded!",
      edit: loadingMsg.key,
    }, { quoted: ms });

    await new Promise(res => setTimeout(res, 500));

    const caption = header + readmore + menuBody + footer;

    if (media.endsWith(".mp4") || media.endsWith(".gif")) {
      await zk.sendMessage(dest, {
        video: { url: media },
        caption,
        gifPlayback: true,
        mentions,
        footer: "✦ DARK-MD V² SYSTEM",
      }, { quoted: ms });
    } else if (media.endsWith(".jpg") || media.endsWith(".jpeg") || media.endsWith(".png")) {
      await zk.sendMessage(dest, {
        image: { url: media },
        caption,
        mentions,
        footer: "✦ DARK-MD V² SYSTEM",
      }, { quoted: ms });
    } else {
      await zk.sendMessage(dest, { text: caption, mentions }, { quoted: ms });
    }

    // Send voice note
    const audioDir = __dirname + "/../𝐝𝐜/";
    if (fs.existsSync(audioDir)) {
      const files = fs.readdirSync(audioDir).filter(f => f.endsWith(".mp3"));
      if (files.length > 0) {
        const randomFile = files[Math.floor(Math.random() * files.length)];
        const filePath = audioDir + randomFile;
        await zk.sendMessage(dest, {
          audio: { url: filePath },
          mimetype: "audio/mpeg",
          ptt: true,
        }, { quoted: ms });
      }
    }
  }
);
