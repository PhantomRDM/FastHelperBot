const Discord = require('discord.js');
const config = require('../config.json');

module.exports.run = async (client, message, args) => {
  if(message.author.bot) return;
  
  let prefix = config.prefix;
  
  if(!message.content.startsWith(prefix)) return;
  
  const m = await message.channel.send("獲取資料完成")
  
  let pong = new Discord.MessageEmbed()
  .setTitle("❔ 延遲測試")
  .setColor('RANDOM')
  .setTimestamp()
  .addField("延遲", `${m.createdTimestamp - message.createdTimestamp}ms`, true)
  .addField("API 延遲", `${Math.round(client.ws.ping)}ms`, true)
  .setFooter(`指令使用者 ${message.author.tag}`, message.author.displayAvatarURL());

  m.edit(pong)
}

module.exports.help = {
  name: "ping"
}