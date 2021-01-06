module.exports = {
    name: 'amiadmin',
    description: 'Displays the user\'s admin status',
    execute(message, args, discord, client){
        if(message.member.permissions.has("ADMINISTRATOR")){
            message.channel.send(`${message.member.user.username}, Yes you are.`);
        }
        else{
            message.channel.send(`${message.member.user.username}, Saddly not :(`);
        }
    }
}