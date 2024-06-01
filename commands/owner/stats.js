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
            .setTitle('ONbot Stats')
            .setDescription(`<:home:1233852688857563166> Guilds: \`${guilds.size}\` 
<:member:1233853218107424890> Members: \`${totalMembers}\` 
<:ping:1233853207323611236> Uptime: \`${uptime}\`
<:rocket:1233852661753970749> Memory: \`${memoryUsage}\``)
            .setColor(`#2b2d31`)
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
