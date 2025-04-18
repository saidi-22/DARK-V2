const os = require("os");
const moment = require("moment-timezone");
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const s = require(__dirname + "/../set");
const { cm } = require(__dirname + "/../framework/zokou");

const more = String.fromCharCode(8206);
const readmore = more.repeat(4001);

zokou({ nomCom: "ma", categorie: "General" }, async (dest, zk, commandeOptions) => {
    const { ms, repondre, nomAuteurMessage, mybotpic } = commandeOptions;

    // Organize commands by category
    const coms = {};
    cm.forEach((com) => {
        if (!coms[com.categorie]) coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    // Set timezone
    moment.tz.setDefault("Africa/Nairobi");
    const temps = moment().format('HH:mm:ss');
    const date = moment().format('DD/MM/YYYY');

    // Bot info
    const mode = s.MODE.toLowerCase() === "yes" ? "public" : "private";

    const infoMsg = `
╭━━━〔 •𝑫𝑨𝑹𝑲 ~ 𝑴𝑫• 〕━━━┈⊷♦ 
┃♦╭──♦───♦────♦─────♥
┃♦│ ❑ ▸ *𝙳𝚊𝚝𝚎*: ${date}
┃♦│ ❑ ▸ *𝚃𝚒𝚖𝚎 𝚗𝚘𝚠*: ${temps}
┃♦│ ❑ ▸ *𝙿𝚛𝚎𝚏𝚒𝚡*: [ ${s.PREFIXE} ]
┃♦│ ❑ ▸ *𝙼𝚘𝚍𝚎*: ${mode} mode
┃♦│ ❑ ▸ *𝙿𝚕𝚞𝚐𝚒𝚗𝚜*: ${cm.length}
┃♦│ ❑ ▸ *𝚁𝚊𝚖*: ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
┃♦│ ❑ ▸ *𝚁𝚞𝚗𝚗𝚒𝚗𝚐 𝚘𝚗*: ${os.platform()}
┃♦│ ❑ ▸ *𝙾𝚠𝚗𝚎𝚛*: ${s.OWNER_NAME}
┃♦│ ❑ ▸ *ᴅᴇᴠᴇʟᴏᴘᴇʀ*: 『𝑫𝑨𝑹𝑲 𝑻𝑬𝑪𝑯』
┃♦│ ❑ ▸ *ᴛɪᴍᴇᴢᴏɴᴇ*: ${s.TZ}
┃♦╰───────────────♦
╰━━━━━━━━━━━━━━━┈⊷♦

> DARK MD ♥︎ WE ARE THE BEST
${readmore}`;

    // Menu
    let menuMsg = `\n *DARK MD CURIOUS COMMANDS*\n`;
    for (const cat in coms) {
        menuMsg += `\n╭──────✦ *${cat.toUpperCase()}* ✦──────`;
        for (const cmd of coms[cat]) {
            menuMsg += `\n│➤│${cmd}`;
        }
        menuMsg += `\n╰───────────────\n`;
    }
    menuMsg += `\n> powered by DARK DEV TECH`;

    // Final message
    const sendMenu = async () => {
        try {
            zk.sendMessage(dest, {
                text: infoMsg + menuMsg,
                contextInfo: {
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363295141350550@newsletter',
                        newsletterName: 'https://whatsapp.com/channel/0029VarDt9t30LKL1SoYXy26',
                        serverMessageId: 143
                    },
                    externalAdReply: {
                        title: "Enjoy...",
                        body: "❣️DARK-MD SWEET MENU❣️",
                        thumbnailUrl: "https://files.catbox.moe/icnssy.PNG",
                        sourceUrl: s.GURL,
                        mediaType: 1,
                        renderLargerThumbnail: true,
                        showAdAttribution: false
                    }
                }
            }, { quoted: ms });
        } catch (e) {
            console.error("🥵 Menu error:", e);
            repondre("🥵 Menu error: " + e);
        }
    };

    await sendMenu();
});
