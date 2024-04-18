const { MessageEmbed } = require("discord.js");
const os = require('os');

module.exports = {
    name: "stats",
    description: 'stats of the bot',
    aliases: [],
    run: async (client, message, args) => {
        // Fetch guilds and calculate total member count
        const guilds = client.guilds.cache;
        const totalMembers = guilds.reduce((total, guild) => total + guild.memberCount, 0);

        // Calculate uptime
        const uptime = formatUptime(client.uptime);

        // Calculate memory usage
        const totalMemory = (os.totalmem() / 1024 / 1024).toFixed(2);
        const usedMemory = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
        const memoryUsage = `${usedMemory} MB / ${totalMemory} MB`;

        const embed = new MessageEmbed()
            .setTitle('Aesthetical Stats')
            .addFields(
                { name: `Guilds`, value: `Guilds \`${guilds.size}\``, inline: true },
                { name: `Members`, value: `Total Members \`${totalMembers}\``, inline: true },
                { name: `Uptime`, value: `Uptime \`${uptime}\``, inline: true },
                { name: `Memory`, value: `Memory \`${memoryUsage}\``, inline: true },
            )
            .setColor(`2b2d31`)
            .setTimestamp();

        // Reply to the message with the embed
        message.reply({ embeds: [embed] });
    },
};

// Function to format uptime
function formatUptime(uptime) {
    const days = Math.floor(uptime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((uptime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((uptime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((uptime % (1000 * 60)) / 1000);
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}
