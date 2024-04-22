const express = require('express');
const app = express();
const chalk = require("chalk");

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
    intents: 32767,
    allowedMentions: { parse: ['users', 'roles'], repliedUser: false },
});

module.exports = client;
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.json");

require("./handler")(client);

client.on('messageCreate', message => {
    // Check if the bot was mentioned using its ID and if the message was not sent by a bot
    if (message.mentions.has(client.user.id) && !message.author.bot) {
        const embed = new MessageEmbed()
            .setColor("#2b2d31")  // Dark gray color
            .setDescription("My prefix is `.`\nIf you want more info, type `.help` to see all the commands available.")
            .setTimestamp();

        message.reply({ embeds: [embed] });
    }
});

const channelId = '1230623201101484134'; // Replace 'YOUR_CHANNEL_ID' with the ID of your desired channel

client.once('ready', () => {
    const channel = client.channels.cache.get(channelId);
    if (!channel) return console.error(`Channel with ID ${channelId} not found.`);

    // Initial embed
    const initialEmbed = new MessageEmbed()
        .setColor("#2b2d31")
        .setDescription("Initial content")
        .setTimestamp();

    // Send the initial embed
    channel.send({ embeds: [initialEmbed] }).then(sentMessage => {
        // Update the embed every 5 seconds
        setInterval(() => {
            const updatedEmbed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription("Updated content")
                .setTimestamp();

            // Edit the sent message with the updated embed
            sentMessage.edit({ embeds: [updatedEmbed] }).catch(console.error);
        }, 5000);
    }).catch(console.error);
});

client.login(process.env.token || client.config.token).catch(err => {
    console.error(err.message);
});
