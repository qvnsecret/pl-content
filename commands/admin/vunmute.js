const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "vunmute",
    description: "Unmutes a member from the voice.",
    run: async (client, message, args) => {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        // Check if the command issuer has the permission to mute members
        if (!message.member.permissions.has("MUTE_MEMBERS")) {
            return message.reply({
                embeds: [new MessageEmbed()
                    .setColor("#2b2d31")
                    .setDescription("You don't have permission to unmute members in voice channels.")]
            }).catch(console.error);
        }

        // Validate if a member is specified
        if (!args[0] || !member) {
            return message.reply({
                embeds: [new MessageEmbed()
                    .setColor("#2b2d31")
                    .setDescription("Please mention a valid member or provide their ID.")]
            }).catch(console.error);
        }

        // Check if the bot has the permission to mute members
        if (!message.guild.me.permissions.has("MUTE_MEMBERS")) {
            return message.reply({
                embeds: [new MessageEmbed()
                    .setColor("#2b2d31")
                    .setDescription("I don't have permissions to unmute members in voice channels.")]
            }).catch(console.error);
        }

        // Validate if the target member is in a voice channel
        if (!member.voice.channel) {
            return message.reply({
                embeds: [new MessageEmbed()
                    .setColor("#2b2d31")
                    .setDescription("The specified user is not in a voice channel.")]
            }).catch(console.error);
        }

        // Check role hierarchy
        if (message.member.roles.highest.position <= member.roles.highest.position) {
            return message.reply({
                embeds: [new MessageEmbed()
                    .setColor("#2b2d31")
                    .setDescription(`${member.user.username} has a higher or equal role than you.`)]
            }).catch(console.error);
        }

        // Execute unmute
        member.voice.setMute(false)
            .then(() => {
                message.reply({
                    embeds: [new MessageEmbed()
                        .setColor("#2b2d31")
                        .setDescription(`Unmuted ${member.user.username} in the voice channel.`)]
                }).catch(console.error);
            })
            .catch(err => {
                console.error(err);
                message.reply({
                    embeds: [new MessageEmbed()
                        .setColor("#2b2d31")
                        .setDescription("Failed to unmute the member in the voice channel.")]
                }).catch(console.error);
            });
    },
};
