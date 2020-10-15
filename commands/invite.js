const Discord = require('discord.js');
const config = require('../config.json');

module.exports.run = async (client, message, args) => {
    let prefix = config.prefix;
    if (message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;

    let invite = new Discord.MessageEmbed()
    .setTitle("邀請機器人&官方Discord群")
    .addField("邀請連結", "[點我邀請機器人](https://discord.com/api/oauth2/authorize?client_id=677103685137858560&permissions=0&scope=bot)")
    .addField("官方Discord群", "[點我進入官方Discord群](https://discord.gg/7vDrnsQ)")
    .setTimestamp()
    .setFooter(`機器人製作 PhantomRDM#2053`, client.user.displayAvatarURL())
    message.channel.send(invite);
}

module.exports.help = {
    name: "invite"
}
