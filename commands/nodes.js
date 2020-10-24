const Discord = require('discord.js');
const config = require('../config.json');

module.exports.run = async (client, message, args) => {
    if (message.author.bot) return;
    let prefix = config.prefix;
    if(!message.content.startsWith(prefix)) return;

    let nodes = new Discord.MessageEmbed()
      .setAuthor("機器人節點狀態")
      .setTitle("機器人所有節點狀態")
      .setColor('GREEN')
      .setDescription("機器人如果節點錯誤，請不要擔心，會於1~12小時內啟動")
      .addField("🛠 指令節點", "指令節點(🇫🇮芬蘭) ✅\n運算節點(🇩🇪德國) ✅", true)
      .addField("📂 資料庫節點", "資料庫節點(🇫🇮芬蘭) ✅\n帳號庫節點(🇫🇮芬蘭) ✅", true)
      .setTimestamp()
      .setFooter(`指令使用者 ${message.author.tag}`, client.user.displayAvatarURL());
      message.channel.send(nodes);
}

module.exports.help = {
  name: "nodes"
}
