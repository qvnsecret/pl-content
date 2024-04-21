const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "ban",
    description: "Bans a member from the server.",
    run: async (client, message, args) => {
        // Check if the command issuer has the permission to ban members
        if (!message.member.permissions.has("BAN_MEMBERS")) {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription(":x: **You don't have permission to use this command**");
            return message.reply({ embeds: [embed] });
        }

        // Check if the bot has the permission to ban members
        if (!message.guild.me.permissions.has("BAN_MEMBERS")) {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription(":rolling_eyes: **I don't have the permissions to ban members!**");
            return message.reply({ embeds: [embed] });
        }

        // Ensure there is a member mentioned or valid ID provided
        if (!args[0]) {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription(":rolling_eyes: **Please mention a member or provide their ID**");
            return message.reply({ embeds: [embed] });
        }

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription(":rolling_eyes: **I can't find this member**");
            return message.reply({ embeds: [embed] });
        }

        if (member.id === message.author.id) {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription(":rolling_eyes: **You can't ban yourself**");
            return message.reply({ embeds: [embed] });
        }

        if (!member.bannable) {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription(`:rolling_eyes: **I can't ban ${member.user.username}. They may have a higher role than me or the same role.**`);
            return message.reply({ embeds: [embed] });
        }

        // Execute the ban
        member.ban().then(() => {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription(`:white_check_mark: **${member.user.username} has been banned from the server!**`);
            message.reply({ embeds: [embed] });
        }).catch(error => {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription(`:warning: **Failed to ban ${member.user.username}: ${error.message}**`);
            message.reply({ embeds: [embed] });
            console.error(`Failed to ban ${member.user.username}:`, error);
        });
    },
};
