module.exports = {
    name: 'info',
    description: 'Displays some info',
    execute(message, args, discord, client){
        const embed = new discord.MessageEmbed()
        .setColor("#0A0AFF")
        .setTitle("Help")
        .addFields(
            {name: `This Awesome Bot Was Created By PlankSkills`,
            value: "Discord: PlankSkills#3152, Click On Profile For More Info"},
            {name: `Credits To:`,
            value: "Gogeta For Being The Boss That Wants Stuff **__QUICK__**"},
            {name: `Seriously`,
            value: "GogetaTheBest, and UltraInstictHype Are Nice Guys!"},
            {name: "If You Need Help", value: "Use /help, You dummy!"});
        message.channel.send(embed);
    }
}