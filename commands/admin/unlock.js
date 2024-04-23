const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "unlock",
    description: "Allows everyone to send messages in the specified channel.",
    run: async (client, message, args) => {
        // Check if the member has the required permission to manage channels
        if (!message.member.permissions.has("MANAGE_CHANNELS")) {
            return message.reply({
                embeds: [new MessageEmbed()
                    .setColor("#2b2d31")
                    .setDescription("You do not have permission to unlock channels.")]
            }).catch(console.error);
        }

        // Check if the bot has the required permission to manage channels
        if (!message.guild.me.permissions.has("MANAGE_CHANNELS")) {
            return message.reply({
                embeds: [new MessageEmbed()
                    .setColor("#2b2d31")
                    .setDescription("I do not have permission to change channel settings.")]
            }).catch(console.error);
        }

        // Find the @everyone role by comparing role names directly
        const everyoneRole = message.guild.roles.cache.find(role => role.name === '@everyone');
        if (!everyoneRole) {
            return message.reply({
                embeds: [new MessageEmbed()
                    .setColor("#2b2d31")
                    .setDescription("Failed to find the '@everyone' role.")]
            }).catch(console.error);
        }

        // Edit permissions for the @everyone role to allow sending messages
        message.channel.permissionOverwrites.edit(everyoneRole, {
            SEND_MESSAGES: true
        }).then(() => {
            message.reply({
                embeds: [new MessageEmbed()
                    .setColor("#2b2d31")
                    .setDescription(`${message.channel.name} has been unlocked and everyone can send messages now.`)]
            }).catch(console.error);
        }).catch(err => {
            console.error(err);
            message.reply({
                embeds: [new MessageEmbed()
                    .setColor("#2b2d31")
                    .setDescription("There was an error while trying to unlock the channel.")]
            }).catch(console.error);
        });
    },
};
