const { MessageEmbed } = require("discord.js");
const db = require('quick.db');

module.exports = {
    name: "unwarn",
    description: "Removes warnings from a user.",
    run: async (client, message, args) => {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        const permission = message.member.permissions.has("MANAGE_MESSAGES");
        if (!permission) {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription("**You don't have permission to use this command**");
            return message.reply({ embeds: [embed] }).catch(err => console.log(`I couldn't reply to the message: ${err.message}`));
        }

        if (!member) {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription("**Please mention a member or provide their ID**");
            return message.reply({ embeds: [embed] });
        }

        let warnings = db.get(`warns_${member.id}`) || 0;

        if (args[1]) {
            const count = parseInt(args[1]);
            if (isNaN(count)) {
                const embed = new MessageEmbed()
                    .setColor("#2b2d31")
                    .setDescription("**Please provide a valid number of warnings to remove**");
                return message.reply({ embeds: [embed] });
            }

            const actualRemoved = count > warnings ? warnings : count;
            db.subtract(`warns_${member.id}`, actualRemoved);
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription(`**Removed ${actualRemoved} warning(s) from ${member.user.username}.**`);
            message.reply({ embeds: [embed] });
        } else {
            db.delete(`warns_${member.id}`);
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription(`**Removed all ${warnings} warnings from ${member.user.username}.**`);
            message.reply({ embeds: [embed] });
        }
    },
};
