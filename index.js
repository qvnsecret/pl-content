const express = require('express');
const app = express();
const chalk = require("chalk");
const { Client, Collection, MessageEmbed, Intents, MessageActionRow, MessageButton, Modal, TextInputComponent, TextInputStyle } = require("discord.js");

// Express setup
app.get('/', (req, res) => {
    res.send('Hello Express app!');
});

app.use('/ping', (req, res) => {
    res.send(new Date());
});

app.listen(3000, () => {
    console.log(chalk.greenBright.bold('The server is now running and listening on port 3000.'));
});

// Discord.js client setup
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

// Load commands
require("./handler")(client);

// Event handler for mentions
client.on('messageCreate', message => {
    if (message.mentions.has(client.user.id) && !message.mentions.everyone && !message.author.bot) {
        const embed = new MessageEmbed()
            .setColor("#2b2d31")
            .setDescription("My prefix is `?`\nIf you want more info, type `?help` to see all the commands available.");

        message.reply({ embeds: [embed] });
    }
});

// Interaction create handler
client.on('interactionCreate', async interaction => {
    if (interaction.isCommand()) {
        const command = client.commands.get(interaction.commandName);
        if (!command) return;
        try {
            await command.run(client, interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error executing that command!', ephemeral: true });
        }
    } else if (interaction.isButton() || interaction.isModalSubmit()) {
        const command = client.slashCommands.get(interaction.customId);
        if (command) {
            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'There was an error handling this interaction!', ephemeral: true });
            }
        }
    }
});

// Login the bot
client.login(process.env.token || client.config.token).catch(err => {
    console.error(err.message);
});
