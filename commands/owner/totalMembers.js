// totalMembers.js
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "totalmembers",
    description: 'Get the total number of members across all servers',
    run: async (client, message, args) => {
        const totalMembers = client.guilds.cache.reduce((total, guild) => total + guild.memberCount, 0);

        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Total Members')
            .setDescription(`The bot has /`/`/`${totalMembers}/`/`/`` total members.`)
            .setTimestamp();

        message.reply({ embeds: [embed] });
    },
};
