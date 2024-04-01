// Import necessary modules
const { MessageEmbed } = require("discord.js");
const os = require('os');

// Export the module
module.exports = {
    name: "stats",
    description: 'stats of the bot',
    aliases: [],
    run: async (client, message, args) => {
        // Function to send stats message
        const sendStats = async () => {
            // Fetch the channel by its ID
            const channel = client.channels.cache.get('YOUR_CHANNEL_ID');
            if (!channel) return;

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
                    { name: 'Number of Servers', value: `\`\`\`${guilds.size}\`\`\``, inline: true },
                    { name: 'Total Members', value: `\`\`\`${totalMembers}\`\`\``, inline: true },
                    { name: 'Uptime', value: `\`\`\`${uptime}\`\`\``, inline: false },
                    { name: 'Memory Usage', value: `\`\`\`${memoryUsage}\`\`\``, inline: false },
                )
                .setColor(message.guild.me.displayHexColor)
                .setTimestamp();

            // Send the embed message to the channel
            channel.send({ embeds: [embed] });
        };

        // Call the function immediately
        await sendStats();

        // Set interval to send stats message every 10 seconds
        setInterval(sendStats, 10000);
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
