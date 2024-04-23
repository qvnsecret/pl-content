const { Client, Intents, MessageEmbed, Collection } = require("discord.js");
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS]
});

client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.json"); // Ensure config.json exists and is configured properly
require("./handler")(client); // Ensure this handler is properly set up for loading commands

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    const channel = client.channels.cache.get('1230623201101484134'); // Use your specific channel ID
    if (!channel) {
        console.log(`Channel with ID 1230623201101484134 not found.`);
        return;
    }

    // Initial embed send or update
    channel.messages.fetch({ limit: 1 }).then(messages => {
        const lastMessage = messages.first();
        if (lastMessage && lastMessage.author.id === client.user.id) {
            lastMessage.edit({ embeds: [createEmbed()] });
        } else {
            channel.send({ embeds: [createEmbed()] });
        }
    }).catch(console.error);
});

client.on('messageCreate', message => {
    // Ignore messages from bots or if the message is not in the specified channel
    if (message.author.bot || message.channel.id !== '1230623201101484134') return;

    message.delete().catch(console.error); // Delete incoming messages safely with error handling
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

client.login(client.config.token).catch(console.error); // Ensure your token is correctly placed in config.json
