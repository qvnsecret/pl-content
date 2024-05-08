const express = require('express');
const app = express();
const chalk = require("chalk");
const os = require('os');

// Serve the home route
app.get('/', (req, res) => {
    res.send('Hello Express app!')
});

// Serve the ping route
app.use('/ping', (req, res) => {
    res.send(new Date());
});

// Start the Express server
app.listen(3000, () => {
    console.log(chalk.greenBright.bold('The server is now running and listening on port 3000.'));
});

// Import the Discord.js library and create a new client
const { Client, Collection, MessageEmbed } = require("discord.js");
const client = new Client({
    intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"],
    allowedMentions: { parse: ['users', 'roles'], repliedUser: false },
});

// Export the client for use in other modules
module.exports = client;

// Initialize collections for commands and slash commands
client.commands = new Collection();
client.slashCommands = new Collection();

// Import and initialize the command handler
require("./handler")(client);

// Listen for messageCreate event and handle bot mentions
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

// Log in the client using the token from environment variable or config.json
client.login(process.env.token || client.config.token).catch(err => {
    console.error(err.message);
});
