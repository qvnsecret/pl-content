const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "kick",
    description: "Kicks a member.",
    run: async (client, message, args) => {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const permission = message.member.permissions.has("KICK_MEMBERS");
        const botPermission = message.guild.me.permissions.has("KICK_MEMBERS");

        if (!permission) {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription("**You don't have permission to use this command**");
            return message.reply({ embeds: [embed], ephemeral: true }).catch(err => console.log(err.message));
        }

        if (!args[0] || !member) {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription("**Please mention a member or provide their ID**");
            return message.reply({ embeds: [embed], ephemeral: true }).catch(err => console.log(err.message));
        }

        if (member.id === message.author.id) {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription("**You can't kick yourself**");
            return message.reply({ embeds: [embed], ephemeral: true }).catch(err => console.log(err.message));
        }

        if (!botPermission || !member.kickable) {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription(`**I can't kick ${member.user.username}. Please check my permissions and role position, or they may have a higher role.**`);
            return message.reply({ embeds: [embed], ephemeral: true }).catch(err => console.log(err.message));
        }

        if (message.member.roles.highest.position <= member.roles.highest.position) {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription(`**You can't kick ${member.user.username} because they have a higher or equal role than you.**`);
            return message.reply({ embeds: [embed], ephemeral: true }).catch(err => console.log(err.message));
        }

        try {
            await member.kick();
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription(`**${member.user.username} has been kicked from the server!**`);
            message.reply({ embeds: [embed], ephemeral: true });
        } catch (err) {
            console.log(`Failed to kick ${member.user.username}:`, err);
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription(`**Failed to kick ${member.user.username}: ${err.message}**`);
            message.reply({ embeds: [embed], ephemeral: true }).catch(error => console.log(error.message));
        }
    },
};
