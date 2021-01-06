const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'buy',
    description: 'The user can use this to buy a role\
     if they have enough balance to do so.',
    execute(message, args, discord, client){
        if(args.length < 1){
            const embed = new discord.MessageEmbed()
            .setTitle("Invalid Arguments, Usage:")
            .setDescription("/buy [item]")
            .setColor("0A0AFF");
            message.channel.send(embed);
        }
        else if(!args[0].startsWith("<@&")){
            const embed = new discord.MessageEmbed()
            .setTitle("You are weird")
            .setDescription(`You can't buy ${args.join(" ")}. I'm pretty sure it's illegal!`)
            .setColor("0A0AFF");
            message.channel.send(embed);
        }
        else {
            let rolesPath = path.join(__dirname, '\\..\\roles.json');
            let rolesString = fs.readFileSync(rolesPath);
            let roles = JSON.parse(rolesString);
            
            let balsPath = path.join(__dirname, '\\..\\bals.json');
            let balsString = fs.readFileSync(balsPath);
            let bals = JSON.parse(balsString);

            let done = 0;
            let index = -1;

            for(let i = 0; i < roles.roles.length; i++){
                if(roles.roles[i].name == args[0]){
                    for(let j = 0; j < bals.data.length; j++){
                        if(bals.data[j].name == message.member.user.username&&
                            bals.data[j].bal >= roles.roles[i].value){
                                if(message.member.roles.cache.has(roles.roles[i].name.replace("<@&", "").replace(">", ""))){
                                    const embed = new discord.MessageEmbed()
                                    .setTitle(`Mistakes happen`)
                                    .setDescription(`${message.member}, You already have that role, you dummy!`)
                                    .setColor("0A0AFF");
                                    message.channel.send(embed);
                                    done = -1;
                                }
                                else{     
                                    bals.data[j].bal -= roles.roles[i].value;
                                    message.member.roles.add(roles.roles[i].name.replace("<@&", "").replace(">", "")).catch((e) => {
                                    const embed = new discord.MessageEmbed()
                                    .setTitle(e.message + `"${roles.roles[i].name.replace("<@&", "").replace(">", "")}" is not a valid role ID`)
                                    .setColor("0A0AFF");
                                    message.channel.send(embed);
                                        });
                                        done = 1;
                                }
                            index = i;
                        }
                        if(done==1){
                            break;
                        }
                    }
                    if(done==1){
                        break;
                    }
                }
                if(done==1){
                    break;
                }
            }
            if(done==1){
                fs.writeFileSync(balsPath, JSON.stringify(bals, null, 2));
                const embed = new discord.MessageEmbed()
                .setTitle("Purchased")
                .setDescription(`GG, ${message.member}! You got the ${args[0]} role for ${roles.roles[index].value} coins`)
                .setColor("0A0AFF");
                message.channel.send(embed);
        
            }
            else if(done!=-1){
                const embed = new discord.MessageEmbed()
                .setTitle("Failed")
                .setDescription(`No such role exists in the shop or you don't have enough money to buy it! You silly!`)
                .setColor("0A0AFF");
                message.channel.send(embed);
            }
        }
    }
}