const { MessageEmbed, Permissions } = require("discord.js");
const db = require('quick.db');

module.exports = {
    name: "antilink-all",
    description: "Enables or disables anti-link protection in all channels.",
    category: "Moderation",
    usage: ".antilink-all <on|off>",
    permissions: "ADMINISTRATOR",

    run: async (client, message, args) => {
        if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
            return message.channel.send({
                embeds: [new MessageEmbed()
                    .setColor("#2b2d31")
                    .setDescription("You do not have the necessary permissions to use this command.")]
            });
        }

        if (!args[0] || !['on', 'off'].includes(args[0])) {
            return message.channel.send({
                embeds: [new MessageEmbed()
                    .setColor("#2b2d31")
                    .setDescription("Invalid usage. Please use `.antilink-all <on|off>`.")]
            });
        }

        const setting = args[0] === 'on';
        db.set(`antilink_all_${message.guild.id}`, setting);

        message.channel.send({
            embeds: [new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription(`Anti-link protection has been ${setting ? 'enabled' : 'disabled'} for all channels.`)]
        });
    }
};
