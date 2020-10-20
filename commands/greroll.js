const ms = require('ms');

exports.run = async (client, message, args) => {

    // If the member doesn't have enough permissions
    if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
        return message.channel.send(':x: 你沒有權限可以重新抽出獲獎者。');
    }

    // If no message ID or giveaway name is specified
    if(!args[0]){
        return message.channel.send(':x: 語法錯誤!你必須打出一個有效的訊息ID!');
    }

    // try to found the giveaway with prize then with ID
    let giveaway = 
    // Search with giveaway prize
    client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
    // Search with giveaway ID
    client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

    // If no giveaway was found
    if(!giveaway){
        return message.channel.send('找不到指定的抽獎活動 `'+ args.join(' ') +'`.');
    }

    // Reroll the giveaway
    client.giveawaysManager.reroll(giveaway.messageID)
    .then(() => {
        // Success message
        message.channel.send('獎品重新抽出獲獎者!');
    })
    .catch((e) => {
        if(e.startsWith(`Giveaway with message ID ${giveaway.messageID} is not ended.`)){
            message.channel.send('此抽獎尚未結束，無法重新抽獎。');
        } else {
            console.error(e);
            message.channel.send('發生錯誤，請聯絡機器人創建者幻影紅羽');
        }
    });

};
