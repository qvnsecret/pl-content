const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "unrole-all",
    description: "Remove a specified role from all users who have it.",
    run: async (client, message, args) => {
        const permission = message.member.permissions.has("MANAGE_ROLES");
        const botPermission = message.guild.me.permissions.has("MANAGE_ROLES");

        if (!permission) {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription("**You don't have permission to use this command**");
            return message.reply({ embeds: [embed] }).catch(err => console.log(err.message));
        }

        if (!botPermission) {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription("**I don't have the required permissions to modify roles. Please check my role position and permissions.**");
            return message.reply({ embeds: [embed] }).catch(err => console.log(err.message));
        }

        if (!args.length) {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription("**Please specify a role to remove from all members.**");
            return message.reply({ embeds: [embed] }).catch(err => console.log(err.message));
        }

        const role = message.mentions.roles.first() || 
                     message.guild.roles.cache.find(r => r.name.toLowerCase().includes(args[0].toLowerCase())) ||
                     message.guild.roles.cache.get(args[0]);

        if (!role) {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription("**Could not find the specified role. Please check the role name or ID and try again.**");
            return message.reply({ embeds: [embed] }).catch(err => console.log(err.message));
        }

        let users = message.guild.members.cache.filter(member => member.roles.cache.has(role.id));
        if (users.size === 0) {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription(`**No users have the role ${role.name} to remove.**`);
            return message.reply({ embeds: [embed] }).catch(err => console.log(err.message));
        }

        users.forEach(user => {
            user.roles.remove(role.id).catch(err => console.log(`Failed to remove role from ${user.user.tag}: ${err}`));
        });

        const embed = new MessageEmbed()
            .setColor("#2b2d31")
            .setDescription(`**Role ${role.name} is being removed from ${users.size} members.**`);
        message.reply({ embeds: [embed] }).catch(err => console.log(err.message));
    },
};
