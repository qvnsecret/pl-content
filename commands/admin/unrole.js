const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "unrole",
    description: "Remove a role from a user.",
    run: async (client, message, args) => {
        const permission = message.member.permissions.has("MANAGE_ROLES");
        const botPermission = message.guild.me.permissions.has("MANAGE_ROLES");

        if (!permission) {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription("**You don't have permission to use this command**");
            return message.reply({ embeds: [embed], ephemeral: true }).catch(err => console.log(`I couldn't reply to the message: ${err.message}`));
        }

        if (!botPermission) {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription("**I don't have the necessary permissions to manage roles.**");
            return message.reply({ embeds: [embed], ephemeral: true }).catch(err => console.log(`I couldn't reply to the message: ${err.message}`));
        }

        if (!args[0]) {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription("**Please mention a member or provide their ID.**");
            return message.reply({ embeds: [embed], ephemeral: true }).catch(err => console.log(`I couldn't reply to the message: ${err.message}`));
        }

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription("**I can't find this member.**");
            return message.reply({ embeds: [embed], ephemeral: true }).catch(err => console.log(`I couldn't reply to the message: ${err.message}`));
        }

        if (message.member.roles.highest.position <= member.roles.highest.position && message.member.id !== message.guild.ownerId) {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription(`**You cannot remove roles from ${member.user.username} due to role hierarchy.**`);
            return message.reply({ embeds: [embed], ephemeral: true }).catch(err => console.log(`I couldn't reply to the message: ${err.message}`));
        }

        if (!args[1]) {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription("**Please specify a role name or ID.**");
            return message.reply({ embeds: [embed], ephemeral: true }).catch(err => console.log(`I couldn't reply to the message: ${err.message}`));
        }

        const role = message.mentions.roles.first() || message.guild.roles.cache.find(r => r.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.roles.cache.get(args[1]);
        if (!role) {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription("**Could not find the specified role. Please check the role name or ID and try again.**");
            return message.reply({ embeds: [embed], ephemeral: true }).catch(err => console.log(`I couldn't reply to the message: ${err.message}`));
        }

        if (!member.roles.cache.has(role.id)) {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription(`**${member.user.username} does not have the role ${role.name}.**`);
            return message.reply({ embeds: [embed], ephemeral: true }).catch(err => console.log(`I couldn't reply to the message: ${err.message}`));
        }

        member.roles.remove(role.id).then(() => {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription(`Removed the role **${role.name}** from **${member.user.username}**.`);
            message.reply({ embeds: [embed] });
        }).catch(err => {
            console.log(`Failed to remove the role: ${err.message}`);
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription(`**Failed to remove the role due to an error.**`);
            message.reply({ embeds: [embed], ephemeral: true }).catch(error => console.log(`I couldn't reply to the message: ${error.message}`));
        });
    },
};
