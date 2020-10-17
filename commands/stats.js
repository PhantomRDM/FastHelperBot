const Discord = require('discord.js');
const config = require('../config.json');
const os = require('os');

module.exports.run = async (client, message, args) => {
    if (message.author.bot) return;
    let prefix = config.prefix;
    if(!message.content.startsWith(prefix)) return;

    let servercount = client.guilds.cache.size;
    let usercount = client.users.cache.size;
    let channelscount = client.channels.cache.size;
    let arch = os.arch();
    let platform = os.platform();
    let shard = client.ws.shards.size;
    let NodeVersion = process.version;
    let cores = os.cpus().length;

    let stats = new Discord.MessageEmbed()
    .setAuthor('機器人資訊')
    .setTitle(`關於 ${client.user.username} 的資訊`)
    .setColor('BLUE')
    .addField("總群組數", `${servercount}`, true)
    .addField("總群組人數", `${usercount}`, true)
    .addField("總群組頻道數", `${channelscount}`, true)
    .addField('架構', `${arch}`, true)
    .addField('作業系統', `${platform}`, true)
    .addField('Node.js版本', `${NodeVersion}`, true)
    .addField('可用核心數', `1`, true)
    .addField('CPU', `Intel® Pentium® GOLD G5400`, true)
    .addField('RAM', `8G DDR4-2400`, true)
    .setTimestamp()
    .setFooter(`指令使用者 ${message.author.tag}`, message.author.displayAvatarURL());
    message.channel.send(stats);
};

module.exports.help = {
    name: "stats"
}