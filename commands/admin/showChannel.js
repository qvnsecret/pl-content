const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "show",
    description: "Makes the channel visible to everyone.",
    run: async (client, message, args) => {
        const permission = message.member.permissions.has("MANAGE_CHANNELS");
        const botPermission = message.guild.me.permissions.has("MANAGE_CHANNELS");

        if (!permission) {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription("**You don't have permission to use this command**");
            return message.reply({ embeds: [embed], ephemeral: true }).catch(err => console.log(`I couldn't reply to the message: ${err.message}`));
        }

        if (!botPermission) {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription("**I don't have the necessary permissions to edit channel settings. Please check my role position and permissions.**");
            return message.reply({ embeds: [embed], ephemeral: true }).catch(err => console.log(`I couldn't reply to the message: ${err.message}`));
        }

        let everyone = message.guild.roles.cache.find(role => role.name === '@everyone');
        if (!everyone) {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription("**Failed to find the '@everyone' role in this guild.**");
            return message.reply({ embeds: [embed] });
        }

        message.channel.permissionOverwrites.edit(everyone, {
            VIEW_CHANNEL: true
        }).then(() => {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription(`**${message.channel.name} is now visible to everyone.**`);
            message.reply({ embeds: [embed], ephemeral: true }).catch(err => console.log(`I couldn't reply to the message: ${err.message}`));
        }).catch(err => {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription(`**Failed to modify channel permissions: ${err.message}**`);
            message.reply({ embeds: [embed] });
        });
    },
};
