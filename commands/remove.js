const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'remove',
    description: 'Admins can use this to remove roles from the shop',
    execute(message, args, discord, client){
        if(message.member.permissions.has("ADMINISTRATOR")){
            if(args.length < 1){
                const embed = new discord.MessageEmbed()
                    .setColor("#0A0AFF")
                    .setTitle("Remove")
                    .setDescription("Removes the specified role from the shop")
                    .addFields(
                    {name: `Invalid Arguments, Usage:`,
                     value: "/remove [role]"},
                     );
                message.channel.send(embed);
        
            }
            else if(!args[0].startsWith("<@&")){
                const embed = new discord.MessageEmbed()
                    .setColor("#0A0AFF")
                    .setTitle("Remove")
                    .setDescription("Removes the specified role from the shop")
                    .addFields(
                    {name: `Invalid Arguments, Usage:`,
                     value: "/remove [role]"},
                    {name: `Tip: `, value: "The role argument must be a ping to a role that's in the shop\n."}
                     );
                message.channel.send(embed);
            }
            else {
                let rolesPath = path.join(__dirname, '\\..\\roles.json');
                let rolesString = fs.readFileSync(rolesPath);
                let roles = JSON.parse(rolesString);
               
                let done = false;

                for(let i = 0; i < roles.roles.length; i++) {
                    if(roles.roles[i].name == args[0]){
                        roles.roles.splice(i);
                        done = true;
                        break;
                    }
                }
                fs.writeFileSync(rolesPath, JSON.stringify(roles, null, 2));
                if(done){
                    const embed = new discord.MessageEmbed()
                    .setColor("#0A0AFF")
                    .setTitle("Success!")
                    .setDescription(`Role ${args[0]} has been removed from the shop!`);
                    message.channel.send(embed);
                }
                else{
                    const embed = new discord.MessageEmbed()
                    .setColor("#0A0AFF")
                    .setTitle("Success!")
                    .setDescription(`Role ${args[0]} doesn't exist in the shop. Can't remove it!`);
                    message.channel.send(embed);
                }
            }
        }
        else{
            const embed = new discord.MessageEmbed()
            .setColor("#0A0AFF")
            .setTitle("You need to have admin privileges to use this command!");
            message.channel.send(embed);
        }
    }
}