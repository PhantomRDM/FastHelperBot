const Discord = require('discord.js');
const config = require('../config.json');

module.exports.run = async (client, message, args) => {
    if (message.author.bot) return;
    let prefix = config.prefix;
    if(!message.content.startsWith(prefix)) return;

    let help = new Discord.MessageEmbed()
      .setAuthor("機器人指令大全")
      .setTitle("機器人資訊")
      .setDescription("機器人還在測試狀態可能會發生一些問題敬請見諒，製作者幻影紅羽")
      .setDescription("機器人還在測試狀態可能會發生一些問題有任何問題歡迎到我們的官方群組回報，製作者幻影紅羽感謝您")
      .addField("🛠 技術指令", "ping(查詢機器人延遲)\nstats(機器人資訊)\ninvite(機器人邀請&官方群組)", true)
      .addField("ℹ 主要指令", "gstart(創建抽獎)\ngreroll(重新抽獲獎者)\ngend(立即結束抽獎)", true)
      .setTimestamp()
      .setFooter(`指令使用者 ${message.author.tag}`, client.user.displayAvatarURL());
    message.channel.send("**指令使用方法以私訊給您**");

    return message.author.send(help);
}

module.exports.help = {
  name: "help"
}
