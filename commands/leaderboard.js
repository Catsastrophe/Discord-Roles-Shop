const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'leaderboard',
    description: 'Shows the richest first',
    execute(message, args, discord, client){
        let leaderboard = [];

        let balPath = path.join(__dirname, '\\..\\bals.json');
        let balsString = fs.readFileSync(balPath);
        let bals = JSON.parse(balsString);
        
        let firstPlace = {
            index: -1,
            value: 0
        };
        let secondPlace = {
            index: -1,
            value: 0
        };
        let thirdPlace = {
            index: -1,
            value: 0
        };
        for(let i = bals.data.length-1; i >= 0; i--){
            if(bals.data[i].bal >= firstPlace.value){
                thirdPlace.value = secondPlace.value;
                thirdPlace.index = secondPlace.index;
                secondPlace.value = firstPlace.value;
                secondPlace.index = firstPlace.index;
                firstPlace.value = bals.data[i].bal;
                firstPlace.index = i;
            }
            if(bals.data[i].bal >= secondPlace.value &&
               bals.data[i].bal < firstPlace.value){
                thirdPlace.value = secondPlace.value;
                thirdPlace.index = secondPlace.index;
                secondPlace.value = bals.data[i].bal;
                secondPlace.index = i;
            }
            if(bals.data[i].bal >= thirdPlace.value &&
               bals.data[i].bal < secondPlace.value){
                thirdPlace.value = bals.data[i].bal;
                thirdPlace.index = i;
            }
        }
        let firstName = firstPlace.index < 0 ?
            "Empty" : bals.data[firstPlace.index].name;
        let secondName = secondPlace.index < 0 ?
            "Empty" : bals.data[secondPlace.index].name;
        let thirdName = thirdPlace.index < 0 ?
            "Empty" : bals.data[thirdPlace.index].name;
        const embed = new discord.MessageEmbed()
            .setColor("0A0AFF")
            .setTitle("Leaderboard")
            .addFields(
                {name: `1st Place - ${firstName}`, value: `${firstPlace.value} coins`},
                {name: `2st Place - ${secondName}`, value: `${secondPlace.value} coins`},
                {name: `3st Place - ${thirdName}`, value: `${thirdPlace.value} coins`}
            );
        message.channel.send(embed);
    }
}