const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'add',
    description: 'Admins can use this to add roles to the shop',
    execute(message, args, discord, client){
        if(message.member.permissions.has("ADMINISTRATOR")){
            if(args.length < 2){
                const embed = new discord.MessageEmbed()
                    .setColor("#0A0AFF")
                    .setTitle("Add")
                    .setDescription("Adds a role to the shop")
                    .addFields(
                    {name: `Invalid Arguments, Usage:`,
                     value: "/add [role] [coin amount]"},
                     );
                message.channel.send(embed);
        
            }
            else if((!args[0].startsWith("<@&"))||(!parseInt(args[1]))){
                const embed = new discord.MessageEmbed()
                    .setColor("#0A0AFF")
                    .setTitle("Add")
                    .setDescription("Adds a role to the shop")
                    .addFields(
                    {name: `Invalid Arguments, Usage:`,
                     value: "/add [role] [coin amount]"},
                    {name: `Tip: `, value: "The role argument must be a ping to a role,\n\
                    while the coin amount must be a positive integer."}
                     );
                message.channel.send(embed);
            }
            else {
                let rolesPath = path.join(__dirname, '\\..\\roles.json');
                let rolesString = fs.readFileSync(rolesPath);
                let roles = JSON.parse(rolesString);
               
                let newRole = {
                    name: args[0],
                    value: args[1]
                }

                roles.roles.push(newRole);
                fs.writeFileSync(rolesPath, JSON.stringify(roles, null, 2));
                const embed = new discord.MessageEmbed()
                    .setColor("#0A0AFF")
                    .setTitle("Success!")
                    .setDescription(`Role ${args[0]} has been added for a cost of ${args[1]} coins!`);
                message.channel.send(embed);
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