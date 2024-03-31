const { Client, Intents, Permissions, MessageEmbed } = require('discord.js');
const { token, ownerId } = require('./config.json');

const client = new Client({ 
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS], 
    partials: ['GUILD_MEMBER']
});

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
    if (!message.content.startsWith('!stats') || message.author.bot) return;

    // Check if the user is the bot owner
    if (message.author.id !== ownerId) {
        return message.reply('Only the bot owner can execute this command.');
    }

    // Fetch guilds and calculate total member count
    const guilds = await client.guilds.fetch();
    const totalMembers = guilds.reduce((total, guild) => total + guild.memberCount, 0);

    // Create an embed with the stats
    const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Bot Stats')
        .addFields(
            { name: 'Number of Servers', value: `${guilds.size}`, inline: true },
            { name: 'Total Members', value: `${totalMembers}`, inline: true },
        )
        .setTimestamp();

    // Send the embed to the bot owner
    const owner = await client.users.fetch(ownerId);
    owner.send({ embeds: [embed] })
        .then(() => {
            message.channel.send('Stats sent to bot owner.');
        })
        .catch(() => {
            message.channel.send('Failed to send stats to bot owner.');
        });
});

client.login(token);
