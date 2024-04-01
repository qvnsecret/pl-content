// guildSize.js
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "guildsize",
    description: 'Get the number of servers the bot is in',
    run: async (client, message, args) => {
        const guilds = client.guilds.cache;

        const embed = new MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
            .setTitle('Guild Size')
            .setDescription(`The bot is in /`/`/`${guilds.size}/`/`/` servers.`)
            .setTimestamp();

        message.reply({ embeds: [embed] });
    },
};
