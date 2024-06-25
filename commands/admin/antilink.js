const { MessageEmbed, Permissions } = require("discord.js");
const db = require('quick.db');

module.exports = {
    name: "antilink",
    description: "Enables or disables anti-link protection in a specific channel.",
    category: "Moderation",
    usage: ".antilink <on|off> <#channel>",
    permissions: "ADMINISTRATOR",

    run: async (client, message, args) => {
        if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
            return message.channel.send({
                embeds: [new MessageEmbed()
                    .setColor("#2b2d31")
                    .setDescription("You do not have the necessary permissions to use this command.")]
            });
        }

        if (!args[0] || !['on', 'off'].includes(args[0]) || !args[1]) {
            return message.channel.send({
                embeds: [new MessageEmbed()
                    .setColor("#2b2d31")
                    .setDescription("Invalid usage. Please use `.antilink <on|off> <#channel>`.")]
            });
        }

        const channel = message.mentions.channels.first();
        if (!channel) {
            return message.channel.send({
                embeds: [new MessageEmbed()
                    .setColor("#2b2d31")
                    .setDescription("Please mention a valid channel.")]
            });
        }

        const setting = args[0] === 'on';
        db.set(`antilink_${message.guild.id}_${channel.id}`, setting);

        message.channel.send({
            embeds: [new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription(`Anti-link protection has been ${setting ? 'enabled' : 'disabled'} for ${channel}.`)]
        });
    }
};
