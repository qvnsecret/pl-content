const { Message, Client, MessageEmbed } = require("discord.js");
const db = require('quick.db')

module.exports = {
    name: "warnings",
    description: "Get the list of warnings for the server or a user",
    run: async (client, message, args) => {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const permission = message.member.permissions.has("MANAGE_MESSAGES");

        if (!permission) {
            return message.reply({
                embeds: [new MessageEmbed()
                    .setColor("#2b2d31")
                    .setDescription(":x: You don't have permission to use this command")]
            }).catch((err) => {
                console.log(`I couldn't reply to the message: ${err.message}`);
            });
        }

        if (!args[0]) {
            return message.reply({
                embeds: [new MessageEmbed()
                    .setColor("#2b2d31")
                    .setDescription(":rolling_eyes: Please mention a member or provide their ID")]
            }).catch((err) => {
                console.log(`I couldn't reply to the message: ${err.message}`);
            });
        }

        if (!member) {
            return message.reply({
                embeds: [new MessageEmbed()
                    .setColor("#2b2d31")
                    .setDescription(":rolling_eyes: I can't find this member")]
            }).catch((err) => {
                console.log(`I couldn't reply to the message: ${err.message}`);
            });
        }

        let warns = await db.fetch(`warns_${member.id}`);
        if (!warns) warns = 0;

        let embed = new MessageEmbed()
            .setColor("#2b2d31")
            .setDescription(`Warn ID (${warns}) by ${member}`);

        message.reply({ embeds: [embed] }).catch((err) => {
            console.log(`I couldn't reply to the message: ${err.message}`);
        });
    },
};
