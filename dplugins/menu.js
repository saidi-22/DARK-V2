const util = require('util');
const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const s = require(__dirname + "/../set");
const moment = require("moment-timezone");
const more = String.fromCharCode(8206);
const readmore = more.repeat(4001);

zokou({ nomCom: "menu", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre, prefixe, nomAuteurMessage } = commandeOptions;
    let { cm } = require(__dirname + "/../framework/zokou");

    let coms = {};
    let mode = (s.MODE.toLowerCase() === "yes") ? "public" : "private";

    for (const com of cm) {
        if (!coms[com.categorie])
            coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    }

    moment.tz.setDefault("Africa/Nairobi");
    const temps = moment().format('HH:mm:ss');
    const date = moment().format('DD/MM/YYYY');

    let infoMsg = `
╭━━━☢︎︎*☆ 𝐃𝐀𝐑𝐊 𝐌𝐃 𝐕2 ☆*☢︎︎━━━❍
┃❍╭──────────────߷
┃❍│▸  *ᴅᴀᴛᴇ*: ${date}
┃❍│▸  *ᴛɪᴍᴇ ɴᴏᴡ*: ${temps}
┃❍│▸  *ᴘʀᴇғɪx* : [  ${s.PREFIXE}  ]
┃❍┃▸  *ᴍᴏᴅᴇ* :  ${mode} mode
┃❍┃▸  *ᴘʟᴜɢɪɴs* : ${cm.length}
┃❍│▸  *ʀᴜɴɴɪɴɢ ᴏɴ* : ${os.platform()}
┃❍│▸  *ᴏᴡɴᴇʀ* :  ${s.OWNER_NAME}
┃❍│▸  *ᴅᴇᴠᴇʟᴏᴘᴇʀ* : 𝑫𝑨𝑹𝑲 𝑻𝑬𝑪𝑯
┃❍│▸  *ᴛɪᴍᴇᴢᴏɴᴇ* : ${s.TZ}
┃❍╰───────────────߷
╰━━━━━━━━━━━━━━━❍
☆𝙳𝙰𝚁𝙆 𝙼𝙳 𝚅2 𝙱𝙾𝚃☆\n${readmore}`;

    let menuMsg = `\n*𝙳𝙰𝚁𝙺 𝙼𝙳 𝚅2 𝙲𝙾𝙼𝙼𝙰𝙽𝙳𝚂*`;

    for (const cat in coms) {
        menuMsg += `

╭──────❍ *${cat}* ❍─────❍︎`;
        for (const cmd of coms[cat]) {
            menuMsg += `
│➪│ ${cmd}`;
        }
        menuMsg += `
╰───────────❍`;
    }

    menuMsg += `

> 𝗗𝗔𝗥𝗞-𝗠𝗗 𝗩2 𝗗𝗘𝗩𝗘𝗟𝗢𝗣𝗘𝗗 𝗕𝗬 𝗧𝗛𝗘 𝗕𝗘𝗦𝗧`;

    const thumbUrl = "https://files.catbox.moe/icnssy.PNG";
    const channelLink = "https://whatsapp.com/channel/0029VarDt9t30LKL1SoYXy26";

    const contextMeta = {
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            newsletterJid: '120363290715861418@newsletter',
            newsletterName: '☆𝗗𝗔𝗥𝗞 𝗠𝗗☆',
            serverMessageId: 143
        },
        externalAdReply: {
            title: "𝗝𝗢𝗜𝗡 𝗠𝗬 𝗖𝗛𝗔𝗡𝗡𝗘𝗟",
            body: "Get updates and exclusive tools",
            thumbnailUrl: thumbUrl,
            sourceUrl: channelLink,
            mediaType: 1,
            renderLargerThumbnail: true,
            showAdAttribution: false
        }
    };

    try {
        await zk.sendMessage(dest, {
            text: infoMsg + menuMsg,
            contextInfo: contextMeta
        }, { quoted: ms });
    } catch (e) {
        console.log("🥵 Menu error: " + e);
        repondre("🥵 Menu error: " + e);
    }
});
