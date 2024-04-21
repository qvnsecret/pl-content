const { MessageEmbed, Client } = require("discord.js");

module.exports = {
    name: "hide",
    description: "Hides the channel from everyone.",
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
                .setDescription("**I couldn't edit the channel permissions. Please check my permissions and role position.**");
            return message.reply({ embeds: [embed], ephemeral: true }).catch(err => console.log(`I couldn't reply to the message: ${err.message}`));
        }
        
        let everyone = message.guild.roles.cache.find(role => role.name === '@everyone');
        message.channel.permissionOverwrites.edit(everyone, {
            VIEW_CHANNEL: false
        }).then(() => {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription(`**${message.channel.name} has been hidden from everyone.**`);
            message.reply({ embeds: [embed], ephemeral: true }).catch(err => console.log(`I couldn't reply to the message: ${err.message}`));
        }).catch(err => {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription(`**Failed to hide the channel: ${err.message}**`);
            message.reply({ embeds: [embed], ephemeral: true }).catch(error => console.log(`I couldn't reply to the message: ${error.message}`));
        });
    },
};
