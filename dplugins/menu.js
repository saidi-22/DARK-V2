const util = require("util");
const fs = require("fs-extra");
const os = require("os");
const moment = require("moment-timezone");
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const s = require(__dirname + "/../set");

zokou(
  {
    nomCom: "menu",
    categorie: "General",
    reaction: "⚡",
  },
  async (dest, zk, commandeOptions) => {
    const { ms, repondre, prefixe, nomAuteurMessage, mybotpic } = commandeOptions;
    const { cm } = require(__dirname + "/../framework/zokou");

    // Loading effect
    const loadStages = [
      "▰▱▱▱▱▱▱▱▱▱ 10% ⏳",
      "▰▰▰▱▱▱▱▱▱▱ 30% ⚙️",
      "▰▰▰▰▰▱▱▱▱▱ 50% 🔄",
      "▰▰▰▰▰▰▰▱▱▱ 70% ✨",
      "▰▰▰▰▰▰▰▰▰▰ 100% ✅",
    ];

    const loadingMsg = await zk.sendMessage(dest, { text: `『 𝐃𝐀𝐑𝐊-𝐌𝐃 𝐌𝐄𝐍𝐔 』\nLoading...\n${loadStages[0]}` }, { quoted: ms });

    for (let i = 1; i < loadStages.length; i++) {
      await new Promise((r) => setTimeout(r, 400));
      await zk.sendMessage(dest, {
        text: `『 𝐃𝐀𝐑𝐊-𝐌𝐃 𝐌𝐄𝐍𝐔 』\nLoading...\n${loadStages[i]}`,
        edit: loadingMsg.key,
      }, { quoted: ms });
    }

    moment.tz.setDefault("Africa/Nairobi");
    const time = moment().format("HH:mm:ss");
    const mode = s.MODE.toLowerCase() === "yes" ? "Private" : "Public";

    // Group commands by category
    let coms = {};
    cm.map((c) => {
      if (!coms[c.categorie]) coms[c.categorie] = [];
      coms[c.categorie].push(c.nomCom);
    });

    const info = `
┌─「 *DARK-MD V² INFO* 」
│ 🧑‍💻 *Owner:* @254107065646
│ ⚙️ *Mode:* ${mode}
│ ⏰ *Time:* ${time} (EAT)
│ 📊 *RAM:* ${format(os.totalmem() - os.freemem())} / ${format(os.totalmem())}
└───────────────────────`;

    const styles = {
      General: "🌟", Group: "👥", Fun: "🎭", Mods: "🛡️",
      Search: "🔍", Logo: "🎨", Utilities: "🛠", AI: "🤖"
    };

    let menuText = `\n╭─〔 ⚡ *COMMANDS MENU* ⚡ 〕─╮\n│ Prefix: *${prefixe}*\n│ Use *${prefixe}help <cmd>* for help\n│\n`;

    for (const cat in coms) {
      const icon = styles[cat] || "✨";
      menuText += `│ ${icon} *${cat.toUpperCase()}*\n`;
      coms[cat].forEach(cmd => {
        menuText += `│   ╰─ ${prefixe}${cmd}\n`;
      });
    }

    menuText += "╰─────────────────────────╯";

    const imageOrVideo = mybotpic();
    const mentions = ["254107065646@s.whatsapp.net"];

    await new Promise((r) => setTimeout(r, 400));

    if (imageOrVideo.match(/\.(mp4|gif)$/i)) {
      await zk.sendMessage(dest, {
        video: { url: imageOrVideo },
        caption: info + "\n" + menuText,
        gifPlayback: true,
        mentions,
      }, { quoted: ms });
    } else if (imageOrVideo.match(/\.(jpg|jpeg|png)$/i)) {
      await zk.sendMessage(dest, {
        image: { url: imageOrVideo },
        caption: info + "\n" + menuText,
        mentions,
      }, { quoted: ms });
    } else {
      await zk.sendMessage(dest, {
        text: info + "\n" + menuText,
        mentions,
      }, { quoted: ms });
    }

    // Random voice note
    const voiceDir = __dirname + "/../voices/";
    if (fs.existsSync(voiceDir)) {
      const voices = fs.readdirSync(voiceDir).filter(f => f.endsWith(".mp3"));
      if (voices.length) {
        const voice = voiceDir + voices[Math.floor(Math.random() * voices.length)];
        if (fs.existsSync(voice)) {
          await zk.sendMessage(dest, {
            audio: { url: voice },
            mimetype: "audio/mpeg",
            ptt: true,
          }, { quoted: ms });
        }
      }
    }
  }
);
