module.exports = {
    name: 'help',
    description: 'This helps the user use bot commands',
    execute(message, args, discord, client){
        const embed = new discord.MessageEmbed()
        .setColor("#0A0AFF")
        .setTitle("Help")
        .addFields(
            {name: `**__Command Help For Users__**`, value: "_ _"},
            {name: `/help`, value: "It pops up this menu"},
            {name: `/bal`, value: "It shows your balance"},
            {name: `/shop`, value: "All the roles money can buy listed"},
            {name: `/buy`, value: "So you are rich huh?"},
            {name: `/leaderboard`, value: "Shows the 3 most rich members on the shop"},
            {name: `/amiadmin`, value: "Do you have admin perms?"},
            {name: `**__Command Help For Admins__**`, value: "_ _"},
            {name: `/collect`, value: "Gives you the specified amount of coins"},
            {name: `/add`, value: "Adds the specified role to the shop list\n\
            for the specified amount of coins"},
            {name: `**__Life advice__**`, value: "_ _"},
            {name: `To Live a Happy Life, Subscribe To My Youtube Channel`,
                 value: "https://www.youtube.com/channel/UCEam85jBElqHLSO_83AKWxg"},
            {name: `This Bot Was Created By`, value: "**PlankSkills**"}
            );
        message.channel.send(embed);
    }
}