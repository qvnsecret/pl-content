const { MessageEmbed } = require("discord.js");
const ms = require('ms');

module.exports = {
    name: "slowmode",
    description: "Sets the slow mode for the channel.",
    run: async (client, message, args) => {
        const permission = message.member.permissions.has("MANAGE_CHANNELS");
        const botPermission = message.guild.me.permissions.has("MANAGE_CHANNELS");

        if (!permission) {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription("You do not have permission to use this command.");
            return message.reply({ embeds: [embed] })
                .catch(err => console.log(`I couldn't reply to the message: ${err.message}`));
        }

        if (!botPermission) {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription("I do not have the necessary permissions to manage channels. Please check my role position and permissions.");
            return message.reply({ embeds: [embed] })
                .catch(err => console.log(`I couldn't reply to the message: ${err.message}`));
        }

        if (!args[0]) {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription("Please provide a valid time format. Examples: '5s', '10m', '1h'.");
            return message.reply({ embeds: [embed] })
                .catch(err => console.log(`I couldn't reply to the message: ${err.message}`));
        }

        let time = ms(args[0]);
        if (!time) {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription("Invalid time format provided. Use formats like '5s', '10m', '1h'.");
            return message.reply({ embeds: [embed] });
        }

        if (time > 21600000) { // 6 hours
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription("The time must be less than 6 hours.");
            return message.reply({ embeds: [embed] });
        }

        message.channel.setRateLimitPerUser(Math.floor(time / 1000), `Requested by: ${message.author.tag}`)
            .then(() => {
                const embed = new MessageEmbed()
                    .setColor("#2b2d31")
                    .setDescription(`Slow mode has been set to ${ms(time, { long: true })} for this channel.`);
                message.reply({ embeds: [embed] });
            })
            .catch(err => {
                console.log(`Failed to set slow mode: ${err.message}`);
                const embed = new MessageEmbed()
                    .setColor("#2b2d31")
                    .setDescription("Failed to set slow mode due to an error.");
                message.reply({ embeds: [embed] });
            });
    },
};
