const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "role",
    description: "Add or remove a role for a user.",
    run: async (client, message, args) => {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
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
                .setDescription("**I don't have the required permissions to manage roles.**");
            return message.reply({ embeds: [embed] }).catch(err => console.log(`I couldn't reply to the message: ${err.message}`));
        }

        if (!args[0] || !member) {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription("**Please mention a member or provide their ID.**");
            return message.reply({ embeds: [embed] });
        }

        if (message.member.roles.highest.position <= member.roles.highest.position && message.member.id !== message.guild.ownerID) {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription(`**You can't modify roles for ${member.user.username} because they have a higher or equal role.**`);
            return message.reply({ embeds: [embed] });
        }

        if (!args[1]) {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription("**Please specify a role name or mention a role.**");
            return message.reply({ embeds: [embed] });
        }

        let role = message.mentions.roles.first() || message.guild.roles.cache.find(r => r.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.roles.cache.get(args[1]);

        if (!role) {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription("**Could not find the specified role. Please check the role name or ID and try again.**");
            return message.reply({ embeds: [embed] });
        }

        if (member.roles.cache.has(role.id)) {
            member.roles.remove(role.id).then(() => {
                const embed = new MessageEmbed()
                    .setColor("#2b2d31")
                    .setDescription(`Removed role ${role.name} from ${member.user.username}.`);
                message.reply({ embeds: [embed] });
            }).catch(err => {
                console.log(`Failed to remove role: ${err.message}`);
            });
        } else {
            member.roles.add(role.id).then(() => {
                const embed = new MessageEmbed()
                    .setColor("#2b2d31")
                    .setDescription(`Added role ${role.name} to ${member.user.username}.`);
                message.reply({ embeds: [embed] });
            }).catch(err => {
                console.log(`Failed to add role: ${err.message}`);
            });
        }
    },
};
