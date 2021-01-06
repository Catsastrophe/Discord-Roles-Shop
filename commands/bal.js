const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'bal',
    description: 'This shows the user\'s current balance',
    execute(message, args, discord, client){
        let balPath = path.join(__dirname, '\\..\\bals.json');
        let balsString = fs.readFileSync(balPath);
        let bals = JSON.parse(balsString);
        let bal = -1;
        if(args.length < 1){
            for(let i = 0; i < bals.data.length; i++){
                if(bals.data[i].name === message.member.user.username){
                    bal = bals.data[i].bal;
                    break;
                }
            }
            if(bal < 0){
                bals.data.push({
                    name: message.member.user.username,
                    bal: 0
                });
                fs.writeFileSync(balPath, JSON.stringify(bals, null, 2));
            }
            const embed = new discord.MessageEmbed()
            .setColor("#0A0AFF")
            .setTitle("Balance")
            .addFields({name: `${message.member.user.username}, Your balance is`, value: `${bal} coins`});
            message.channel.send(embed);
        }
        else if(!args[0].startsWith("<@")){
            const embed = new discord.MessageEmbed()
            .setColor("#0A0AFF")
            .setTitle("Invalid Argument, Usage:")
            .setDescription("/bal [@user]: to view user's balance ***or***\n\
            /bal: to view your own")
            message.channel.send(embed);
        }
        else{
            let balUser = message.mentions.users.first();
            for(let i = 0; i < bals.data.length; i++){
                if(bals.data[i].name === balUser.username){
                    bal = bals.data[i].bal;
                    break;
                }
            }
            if(bal < 0){
                bals.data.push({
                    name: balUser.username,
                    bal: 0
                });
                fs.writeFileSync(balPath, JSON.stringify(bals, null, 2));
            }
            
            if(balUser == undefined){
                const embed = new discord.MessageEmbed()
            .setColor("#0A0AFF")
            .setTitle("Oh No!")
            .setDescription(`balUser is undefined`);
            message.channel.send(embed);
            }

            const embed = new discord.MessageEmbed()
            .setColor("#0A0AFF")
            .setTitle("Balance")
            .setDescription(`${balUser}'s balance is '${bal} coins`);
            message.channel.send(embed);
        }
    }
}