const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "role-all",
    description: "Add a role to all users who do not already have it.",
    run: async (client, message, args) => {
        const permission = message.member.permissions.has("MANAGE_ROLES");
        const botPermission = message.guild.me.permissions.has("MANAGE_ROLES");

        if (!permission) {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription("**You don't have permission to use this command**");
            return message.reply({ embeds: [embed] }).catch(err => console.log(`I couldn't reply to the message: ${err.message}`));
        }

        if (!botPermission) {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription("**I don't have the required permissions to add roles. Please check my role position and permissions.**");
            return message.reply({ embeds: [embed] }).catch(err => console.log(`I couldn't reply to the message: ${err.message}`));
        }

        if (!args.length) {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription("**Please specify a role name or mention a role.**");
            return message.reply({ embeds: [embed] });
        }

        let role = message.mentions.roles.first() || 
                   message.guild.roles.cache.find(r => r.name.toLowerCase() === args[0].toLowerCase()) ||
                   message.guild.roles.cache.get(args[0]);

        if (!role) {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription("**Could not find the specified role. Please check the role name or ID and try again.**");
            return message.reply({ embeds: [embed] });
        }

        const users = message.guild.members.cache.filter(member => !member.roles.cache.has(role.id));
        users.forEach(user => {
            user.roles.add(role).catch(err => {
                console.log(`Failed to add role to ${user.user.tag}: ${err}`);
            });
        });

        const embed = new MessageEmbed()
            .setColor("#2b2d31")
            .setDescription(`**Adding the role '${role.name}' to ${users.size} member(s).**`);
        message.reply({ embeds: [embed] }).catch(err => console.log(`I couldn't reply to the message: ${err.message}`));
    },
};
