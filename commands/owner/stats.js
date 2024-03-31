const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "stats",
    description: 'stats of the bot',
    aliases: [],
    run: async (client, message, args) => {
        // Fetch guilds and calculate total member count
        const guilds = client.guilds.cache;
        const totalMembers = guilds.reduce((total, guild) => total + guild.memberCount, 0);

        const embed = new MessageEmbed()
            .setTitle('Aesthetical Stats')
            .addFields(
                { name: 'Number of Servers', value: `\`\`\`${guilds.size}\`\`\``, inline: true },
                { name: 'Total Members', value: `\`\`\`${totalMembers}\`\`\``, inline: true },
            )
            .setColor(message.guild.me.displayHexColor)
            .setTimestamp();

        // Reply to the message with the embed
        message.reply({ embeds: [embed] });
    },
};
