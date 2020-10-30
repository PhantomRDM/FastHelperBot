const ms = require('ms');

exports.run = async (client, message, args) => {

    if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
        return message.channel.send(':x: 你沒有權限可以重新抽出獲獎者。');
    }

    if(!args[0]){
        return message.channel.send(':x: 語法錯誤!你必須打出一個有效的訊息ID!');
    }

    let giveaway = 
    client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
    client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

    if(!giveaway){
        return message.channel.send('找不到指定的抽獎活動 `'+ args.join(' ') +'`.');
    }

    client.giveawaysManager.reroll(giveaway.messageID)
    .then(() => {
        message.channel.send('獎品重新抽出獲獎者!');
    })
    .catch((e) => {
        if(e.startsWith(`Giveaway with message ID ${giveaway.messageID} is not ended.`)){
            message.channel.send('此抽獎尚未結束，無法重新抽獎。');
        } else {
            console.error(e);
            message.channel.send('發生錯誤，代碼0012');
        }
    });

};
