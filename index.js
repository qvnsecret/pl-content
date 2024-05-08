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

const { Client, Collection, MessageEmbed, Intents } = require("discord.js");
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS
    ],
    allowedMentions: { parse: ['users', 'roles'], repliedUser: false }
});

module.exports = client;
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.json");

require("./handler")(client);

client.on('messageCreate', message => {
    // Check if the bot is specifically mentioned and ignore messages from bots (including itself)
    if (message.mentions.has(client.user.id) && !message.mentions.everyone && !message.author.bot) {
        // Send an embed in response to the mention
        const embed = new MessageEmbed()
            .setColor("#2b2d31")  // Dark gray color
            .setDescription("My prefix is `.`\nIf you want more info, type `.help` to see all the commands available.");

        message.reply({ embeds: [embed] });
    }
});

client.login(process.env.token || client.config.token).catch(err => {
    console.error(err.message);
});
