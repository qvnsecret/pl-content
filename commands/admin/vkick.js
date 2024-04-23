const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "vkick",
    description: "Kicks a member from the voice channel.",
    run: async (client, message, args) => {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        // Check for command issuer's permission
        if (!message.member.permissions.has("MOVE_MEMBERS")) {
            return message.reply({ content: "You don't have permission to use this command." }).catch(console.error);
        }

        // Check if a member is specified
        if (!args[0] || !member) {
            return message.reply({ content: "Please mention a member or provide their ID." }).catch(console.error);
        }

        // Check bot's permission
        if (!message.guild.me.permissions.has("MOVE_MEMBERS")) {
            return message.reply({ content: "I don't have permission to kick members from voice channels." }).catch(console.error);
        }

        // Verify the command issuer is in a voice channel
        if (!message.member.voice.channel) {
            return message.reply({ content: "You must be in a voice channel to use this command." }).catch(console.error);
        }

        // Verify the target member is in a voice channel
        if (!member.voice.channel) {
            return message.reply({ content: "The specified user is not in a voice channel." }).catch(console.error);
        }

        // Check role hierarchy
        if (message.member.roles.highest.position <= member.roles.highest.position) {
            return message.reply({ content: `${member.user.username} has a higher or equal role than you.` }).catch(console.error);
        }

        // Execute voice kick
        member.voice.disconnect().then(() => {
            message.reply({ content: `Kicked ${member.user.username} from the voice channel.` }).catch(console.error);
        }).catch(err => {
            console.error(err);
            message.reply({ content: "Failed to kick the member from the voice channel." }).catch(console.error);
        });
    },
};
