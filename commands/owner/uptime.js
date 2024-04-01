// uptime.js
const { MessageEmbed } = require("discord.js");
const { formatUptime } = require('./utils');

module.exports = {
    name: "uptime",
    description: 'Get the bot\'s uptime',
    run: async (client, message, args) => {
        const uptime = formatUptime(client.uptime);

        const embed = new MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
            .setTitle('Bot Uptime')
            .setDescription(`The bot has been up for: \`\`\`${uptime}\`\`\``)
            .setTimestamp();

        message.reply({ embeds: [embed] });
    },
};
