const { Client, Collection, MessageEmbed } = require("discord.js");
const client = new Client({
    intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"],
    allowedMentions: { parse: ['users', 'roles'], repliedUser: false },
});

// Setup configuration and handlers
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.json");
require("./handler")(client);

client.on('messageCreate', async message => {
    // Ignore messages from bots to avoid loops
    if (message.author.bot) return;

    // Check if the message is in the specified channel
    if (message.channel.id === '1230623201101484134') { // Use your specific channel ID here
        try {
            // Delete the message
            await message.delete();

            // Post or update the status embed
            const embedMessage = await message.channel.messages.fetch({ limit: 1 });
            if (embedMessage.size === 0) {
                // If no previous message, send a new embed
                message.channel.send({ embeds: [createEmbed()] });
            } else {
                // If there is a previous message, edit it
                const lastMessage = embedMessage.first();
                if (lastMessage.author.id === client.user.id) {
                    lastMessage.edit({ embeds: [createEmbed()] });
                } else {
                    message.channel.send({ embeds: [createEmbed()] });
                }
            }
        } catch (err) {
            console.error('Failed to delete the message or send/update the embed:', err);
        }
    }
});

function createEmbed() {
    const totalMembers = client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0);
    const totalGuilds = client.guilds.cache.size;
    const uptime = formatUptime(client.uptime);
    const usedMemory = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
    const botPing = client.ws.ping;

    return new MessageEmbed()
        .setColor("#2b2d31")
        .setTitle("Bot Status")
        .addField("Servers", totalGuilds.toString(), true)
        .addField("Total Members", totalMembers.toString(), true)
        .addField("Uptime", uptime, true)
        .addField("Ping", `${botPing} ms`, true)
        .addField("Memory Usage", `${usedMemory} MB`, true)
        .setTimestamp();
}

function formatUptime(uptime) {
    let totalSeconds = (uptime / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return `${hours}h ${minutes}m ${seconds}s`;
}

client.login(process.env.token || client.config.token).catch(err => {
    console.error('Failed to login:', err.message);
});
