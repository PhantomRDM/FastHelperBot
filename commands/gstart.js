const ms = require('ms');

exports.run = async (client, message, args) => {

    if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
        return message.channel.send(':x: 你沒有權限使用這個指令');
    }

    let giveawayChannel = message.mentions.channels.first();
    if(!giveawayChannel){
        return message.channel.send(':x: 語法錯誤!/gstart 頻道 時間 獲獎者人數 獎品。');
    }

    let giveawayDuration = args[1];
    if(!giveawayDuration || isNaN(ms(giveawayDuration))){
        return message.channel.send(':x: 語法錯誤!/gstart 頻道 時間 獲獎者人數 獎品。');
    }

    let giveawayNumberWinners = args[2];
    if(isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)){
        return message.channel.send(':x: 語法錯誤!/gstart 頻道 時間 獲獎者人數 獎品。');
    }

    let giveawayPrize = args.slice(3).join(' ');
    if(!giveawayPrize){
        return message.channel.send(':x: 語法錯誤!最重要的獎品是甚麼呢?你都沒打我怎麼知道你要抽甚麼:(');
    }

    client.giveawaysManager.start(giveawayChannel, {
        time: ms(giveawayDuration),
        prize: giveawayPrize,
        winnerCount: giveawayNumberWinners,
        hostedBy: client.config.hostedBy ? message.author : null,
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
                pluralS: false
            }
        }
    });

    message.channel.send(`抽獎開始在 ${giveawayChannel}!`);

};
