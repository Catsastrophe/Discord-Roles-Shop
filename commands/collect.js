const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'collect',
    description: 'Gives the user an x amount of coins',
    execute(message, args, discord, client){
        if(message.member.permissions.has("ADMINISTRATOR")){
            if(args < 1){
                const embed = new discord.MessageEmbed()
                .setColor("#0A0AFF")
                .setTitle(`Invalid Arguments, Usage:`)
                .setDescription(`/collect [amount]`)
                
                message.channel.send(embed);
            }
            else if(isNaN(parseInt(args[0]))||parseInt(args[0])>99999){
                const embed = new discord.MessageEmbed()
                .setColor("#0A0AFF")
                .setTitle(`Invalid Type Arguments:`)
                .setDescription(`The amount must be a number less than 100K!`)
                
                message.channel.send(embed);
            }
            else{
                let balPath = path.join(__dirname, '\\..\\bals.json');
                let balsString = fs.readFileSync(balPath);
                let bals = JSON.parse(balsString);
                let bal = -1;
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
                    bal = 0;
                }
                for(let i = 0; i < bals.data.length; i++){
                    if(bals.data[i].name === message.member.user.username){
                        bals.data[i] = {
                        name: message.member.user.username,
                        bal: bal+parseInt(args[0])
                        };
                    }
                }
                fs.writeFileSync(balPath, JSON.stringify(bals, null, 2));
                const embed = new discord.MessageEmbed()
                .setColor("#0A0AFF")
                .setTitle(`${message.member.user.username}, You got ${args[0]} coins! Now you have ${bal+parseInt(args[0])}`);
                
                message.channel.send(embed);
            }
        }
        else{
            const embed = new discord.MessageEmbed()
                .setColor("#0A0AFF")
                .setTitle(`You need to be an admin to use that command!`);
                
                message.channel.send(embed);
        }
    }
}