const ms = require('ms');

exports.run = async (client, message, args) => {

    // If the member doesn't have enough permissions
    if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
        return message.channel.send(':x: 你沒有權限使用這個指令');
    }

    // Giveaway channel
    let giveawayChannel = message.mentions.channels.first();
    // If no channel is mentionned
    if(!giveawayChannel){
        return message.channel.send(':x: 語法錯誤!需要提及有效的頻道。');
    }

    // Giveaway duration
    let giveawayDuration = args[1];
    // If the duration isn't valid
    if(!giveawayDuration || isNaN(ms(giveawayDuration))){
        return message.channel.send(':x: 語法錯誤!你需要輸入結束時間。');
    }

    // Number of winners
    let giveawayNumberWinners = args[2];
    // If the specified number of winners is not a number
    if(isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)){
        return message.channel.send(':x: 語法錯誤!你必須輸入獲勝者數量。');
    }

    // Giveaway prize
    let giveawayPrize = args.slice(3).join(' ');
    // If no prize is specified
    if(!giveawayPrize){
        return message.channel.send(':x: 語法錯誤!最重要的獎品是甚麼呢?你都沒打我怎麼知道你要抽甚麼:(');
    }

    // Start the giveaway
    client.giveawaysManager.start(giveawayChannel, {
        // The giveaway duration
        time: ms(giveawayDuration),
        // The giveaway prize
        prize: giveawayPrize,
        // The giveaway winner count
        winnerCount: giveawayNumberWinners,
        // Who hosts this giveaway
        hostedBy: client.config.hostedBy ? message.author : null,
        // Messages
        messages: {
            giveaway: (client.config.everyoneMention ? "" : "")+"🎉🎉 **抽獎時間** 🎉🎉",
            giveawayEnded: (client.config.everyoneMention ? "" : "")+"🎉🎉 **抽獎結束** 🎉🎉",
            timeRemaining: "剩餘時間: **{duration}**!",
            inviteToParticipate: "點擊 🎉 反應參與抽獎!",
            winMessage: "恭喜, {winners}! 你贏得了 **{prize}**!",
            embedFooter: "Giveaways",
            noWinner: "沒有人參與抽獎，所以沒有獲獎者",
            hostedBy: "指令使用者: {user}",
            winners: "獲獎者",
            endedAt: "抽獎結束時間",
            units: {
                seconds: "秒",
                minutes: "分鐘",
                hours: "小時",
                days: "天",
                pluralS: false // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2
            }
        }
    });

    message.channel.send(`抽獎開始在 ${giveawayChannel}!`);

};
