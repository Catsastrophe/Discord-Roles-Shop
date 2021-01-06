const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'shop',
    description: 'Displays the availabe roles the user can buy in the shop',
    execute(message, args, discord, client){
        let rolesPath = path.join(__dirname, '\\..\\roles.json');
        let rolesString = fs.readFileSync(rolesPath);
        let roles = JSON.parse(rolesString);

        let fields = [];

        for(let i = 0; i < roles.roles.length; i++){
            fields.push(roles.roles[i].name + ":");
            fields.push(`costs ${roles.roles[i].value} coins\n`);
        }

        const embed = new discord.MessageEmbed()
            .setColor("0A0AFF")
            .setTitle("The Shop")
            .setDescription("Here are the roles available in the shop.\n\
             Buy one if you have enough balance to\ndo so using the /buy command!\n\n"+
             fields.join("\n"))                
        message.channel.send(embed);
    }
}