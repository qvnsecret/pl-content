const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "setnick",
    description: "Changes the member's nickname.",
    run: async (client, message, args) => {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const permission = message.member.permissions.has("MANAGE_NICKNAMES");
        const botPermission = message.guild.me.permissions.has("MANAGE_NICKNAMES");

        if (!permission) {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription("**You don't have permission to use this command**");
            return message.reply({ embeds: [embed] }).catch(err => console.log(`I couldn't reply to the message: ${err.message}`));
        }

        if (!args[0]) {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription("**Please mention a member or provide their ID**");
            return message.reply({ embeds: [embed] });
        }

        if (!member) {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription("**I can't find this member**");
            return message.reply({ embeds: [embed] });
        }

        if (!botPermission) {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription("**I don't have the necessary permissions to change nicknames. Please check my role position and permissions.**");
            return message.reply({ embeds: [embed] });
        }

        if (message.member.roles.highest.position <= member.roles.highest.position && message.member.id !== message.guild.ownerID) {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription(`**You cannot change the nickname of ${member.user.username} as they have a higher or equal role than you.**`);
            return message.reply({ embeds: [embed] });
        }

        let name = args.slice(1).join(' ') || null;
        member.setNickname(name).then(() => {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription(`**${member.user.username}'s** nickname has been ${name ? `changed to **${name}**` : "reset"}`);
            message.reply({ embeds: [embed] });
        }).catch(err => {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription(`**Failed to change nickname for ${member.user.username}: ${err.message}**`);
            message.reply({ embeds: [embed] });
            console.log(`I couldn't change the nickname: ${err.message}`);
        });
    },
};
