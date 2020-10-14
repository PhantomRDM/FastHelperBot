const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if(args[0] == "help"){
    let helpembxd = new Discord.RichEmbed()
    .setColor("#00ff00")
    .addField("刪除訊息指令格式", "/clear <訊息數>")

    message.channel.send(helpembxd);
    return;
  } 

  message.delete()

  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("你沒有權限這麼做");
  if(!args[0]) return message.channel.send("指令錯誤!沒有輸入清除多少訊息 `/clear <訊息數>`");
  message.channel.bulkDelete(args[0]).then(() => {
  message.channel.send(`**我清除了 ${args[0]} 條訊息**`).then(msg => msg.delete(2000));
});


}

module.exports.help = {
  name: "clear"
}
