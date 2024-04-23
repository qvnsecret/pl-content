const express = require('express');
const app = express();
const chalk = require("chalk");
const os = require('os');

app.get('/', (req, res) => {
    res.send('Hello Express app!')
});

app.use('/ping', (req, res) => {
    res.send(new Date());
});

app.listen(3000, () => {
    console.log(chalk.greenBright.bold('The server is now running and listening on port 3000.'));
});

const { Client, Collection, MessageEmbed } = require("discord.js");
const client = new Client({
    intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"],
    allowedMentions: { parse: ['users', 'roles'], repliedUser: false },
});

module.exports = client;
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.json");

require("./handler")(client);

client.on('messageCreate', message => {
    // Check if the bot is specifically mentioned and ignore messages from bots (including itself)
    if (message.mentions.users.has(client.user.id) && !message.mentions.everyone && !message.author.bot) {
        const embed = new MessageEmbed()
            .setColor("#2b2d31")  // Dark gray color
            .setDescription("My prefix is `.`\nIf you want more info, type `.help` to see all the commands available.")
            .setTimestamp();

        // Send the embed in response to the mention
        message.reply({ embeds: [embed] });
    }
});


const channelId = '1230623201101484134'; // Replace 'YOUR_CHANNEL_ID' with the ID of your desired channel

client.once('ready', () => {
    const channel = client.channels.cache.get(channelId);
    if (!channel) return console.error(`Channel with ID ${channelId} not found.`);

    // Send initial embed
    channel.send({ embeds: [createEmbed()] }).then(sentMessage => {
        // Update the embed every 5 seconds
        setInterval(() => {
            sentMessage.edit({ embeds: [createEmbed()] }).catch(console.error);
        }, 1000);
    }).catch(console.error);
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
        .setImage("https://cdn.discordapp.com/attachments/1223564129286230038/1232405905224630322/operational_2.gif?ex=662956f0&is=66280570&hm=08bd5615f78f2f44487443c8291c1c68f2d16edd0ab7fe6cfb36a6a9965ede61&")
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
    console.error(err.message);
});
