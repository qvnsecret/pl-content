const { MessageEmbed } = require("discord.js");
const db = require('quick.db');

module.exports = (client) => {
    client.on('messageCreate', async (message) => {
        if (message.author.bot) return;

        const antilinkChannel = db.get(`antilink_${message.guild.id}_${message.channel.id}`);
        
        if (antilinkChannel) {
            const linkRegex = /(https?:\/\/[^\s]+)/g;
            if (linkRegex.test(message.content)) {
                await message.delete();
                const warningMessage = await message.channel.send({
                    embeds: [new MessageEmbed()
                        .setColor("#2b2d31")
                        .setDescription(`${message.author}, you can't send links here.`)]
                });

                setTimeout(() => warningMessage.delete(), 5000); // Delete the warning message after 5 seconds
            }
        }
    });
};
