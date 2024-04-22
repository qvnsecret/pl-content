const { MessageEmbed } = require("discord.js");
const ms = require('ms');

module.exports = {
    name: "timeout",
    description: "Gives timeout to a member.",
    run: async (client, message, args) => {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!message.member.permissions.has("MODERATE_MEMBERS")) {
            return message.reply({ embeds: [new MessageEmbed().setColor("#2b2d31").setDescription("You don't have permission to use this command.")] });
        }

        if (!message.guild.me.permissions.has("MODERATE_MEMBERS")) {
            return message.reply({ embeds: [new MessageEmbed().setColor("#2b2d31").setDescription("I don't have permission to timeout members.")] });
        }

        if (!args[0] || !member) {
            return message.reply({ embeds: [new MessageEmbed().setColor("#2b2d31").setDescription("Please mention a valid member or provide their ID.")] });
        }

        if (member.id === message.author.id) {
            return message.reply({ embeds: [new MessageEmbed().setColor("#2b2d31").setDescription("You cannot timeout yourself.")] });
        }

        if (message.member.roles.highest.position <= member.roles.highest.position) {
            return message.reply({ embeds: [new MessageEmbed().setColor("#2b2d31").setDescription(`You cannot timeout ${member.user.username} as they have a higher role than you.`)] });
        }

        if (!args[1] || !ms(args[1])) {
            return message.reply({ embeds: [new MessageEmbed().setColor("#2b2d31").setDescription("Please provide a valid time format. Examples: '1s', '5m', '10m', '1h', '1d', '1w'.")] });
        }

        if (ms(args[1]) > ms('28d')) {
            return message.reply({ embeds: [new MessageEmbed().setColor("#2b2d31").setDescription("The maximum timeout duration is 28 days.")] });
        }

        member.timeout(ms(args[1]), `Timeout applied by: ${message.member.displayName} (${message.author.id})`)
            .then(() => {
                message.reply({ embeds: [new MessageEmbed().setColor("#2b2d31").setDescription(`Successfully applied a timeout to ${member.user.username} for ${args[1]}.`)] });
            })
            .catch(err => {
                console.error(err);
                message.reply({ embeds: [new MessageEmbed().setColor("#2b2d31").setDescription("Failed to apply the timeout. Please check my role position and permissions.")] });
            });
    },
};
