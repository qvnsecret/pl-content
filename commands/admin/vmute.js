const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "vmute",
    description: "Mutes a member from the voice.",
    run: async (client, message, args) => {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        // Checking if the command issuer has the necessary permissions
        if (!message.member.permissions.has("MUTE_MEMBERS")) {
            return message.reply({
                embeds: [new MessageEmbed()
                    .setColor("#2b2d31")
                    .setDescription("You don't have permission to mute members in voice channels.")]
            }).catch(console.error);
        }

        // Validate if member is specified
        if (!args[0] || !member) {
            return message.reply({
                embeds: [new MessageEmbed()
                    .setColor("#2b2d31")
                    .setDescription("Please mention a valid member or provide their ID.")]
            }).catch(console.error);
        }

        // Check if the bot has permission
        if (!message.guild.me.permissions.has("MUTE_MEMBERS")) {
            return message.reply({
                embeds: [new MessageEmbed()
                    .setColor("#2b2d31")
                    .setDescription("I don't have permissions to mute members in voice channels.")]
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

        // Execute mute
        member.voice.setMute(true)
            .then(() => {
                message.reply({
                    embeds: [new MessageEmbed()
                        .setColor("#2b2d31")
                        .setDescription(`Muted ${member.user.username} in the voice channel.`)]
                }).catch(console.error);
            })
            .catch(err => {
                console.error(err);
                message.reply({
                    embeds: [new MessageEmbed()
                        .setColor("#2b2d31")
                        .setDescription("Failed to mute the member in the voice channel.")]
                }).catch(console.error);
            });
    },
};
