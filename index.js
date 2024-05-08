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
        }, 5000); // Update every 5000ms (5 seconds)
    }).catch(console.error);
});

client.login(process.env.token || client.config.token).catch(err => {
    console.error(err.message);
});

// Function to create the embed
function createEmbed() {
    // Embed content goes here
}
