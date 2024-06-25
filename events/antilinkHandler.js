const { MessageEmbed } = require("discord.js");
const db = require('quick.db');

module.exports = (client) => {
    client.on('messageCreate', async (message) => {
        if (message.author.bot) return;
        
        const antilink = db.get(`antilink_${message.guild.id}`);
        if (antilink) {
            const linkRegex = /(https?:\/\/[^\s]+)/g;
            if (linkRegex.test(message.content)) {
                await message.delete();
                message.channel.send({
                    embeds: [new MessageEmbed()
                        .setColor("#2b2d31")
                        .setDescription(`${message.author}, links are not allowed in this server.`)]
                }).then(msg => {
                    setTimeout(() => msg.delete(), 5000); // Delete the warning message after 5 seconds
                });
            }
        }
    });
};
