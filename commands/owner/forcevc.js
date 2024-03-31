const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'joinvc',
    description: 'Join a voice channel and deafen the bot',
    run: async (client, message, args) => {
        // Check if the user is in a guild (server)
        if (!message.guild) {
            return message.reply('This command can only be used in a server.');
        }

        // Check if the user is the owner of the server or the bot owner
        const isOwner = message.author.id === message.guild.ownerId || message.author.id === client.ownerId;

        if (!isOwner) {
            return message.reply('Only the server owner or the bot owner can use this command.');
        }

        // Check if the user is in a voice channel
        if (!message.member.voice.channel) {
            return message.reply('You must be in a voice channel to use this command.');
        }

        const voiceChannel = message.member.voice.channel;

        // Check if the bot has permission to join and speak in the channel
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT') || !permissions.has('SPEAK') || !permissions.has('DEAFEN_MEMBERS')) {
            return message.reply('I don\'t have the necessary permissions to join, speak, or deafen in that voice channel.');
        }

        try {
            // Join the mentioned voice channel
            const connection = await voiceChannel.join();
            
            // Deafen the bot
            connection.voice.setSelfDeaf(true);

            message.reply(`Successfully joined and deafened in ${voiceChannel.name}.`);
        } catch (error) {
            console.error(`Error joining voice channel: ${error}`);
            message.reply('There was an error joining the voice channel.');
        }
    },
};
