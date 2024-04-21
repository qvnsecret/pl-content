const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "move",
    description: "Moves a member to another voice channel.",
    run: async (client, message, args) => {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const permission = message.member.permissions.has("MOVE_MEMBERS");
        const botPermission = message.guild.me.permissions.has("MOVE_MEMBERS");

        if (!permission) {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription("**You don't have permission to use this command**");
            return message.reply({ embeds: [embed] }).catch(err => console.log(err.message));
        }

        if (!args[0] || !member) {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription("**Please mention a member or provide their ID**");
            return message.reply({ embeds: [embed] }).catch(err => console.log(err.message));
        }

        if (!botPermission) {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription("**I don't have the permissions to move members. Please check my permissions and role position.**");
            return message.reply({ embeds: [embed] }).catch(err => console.log(err.message));
        }

        if (message.member.roles.highest.position < member.roles.highest.position) {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription(`**${member.user.username} has a higher role than you.**`);
            return message.reply({ embeds: [embed] }).catch(err => console.log(err.message));
        }

        if (!message.member.voice.channel) {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription("**You aren't in a voice channel.**");
            return message.reply({ embeds: [embed] });
        }

        let targetVoiceChannel = message.member.voice.channel;
        member.voice.setChannel(targetVoiceChannel).then(() => {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription(`**Moved ${member.user.username} to ${targetVoiceChannel.name}.**`);
            message.reply({ embeds: [embed] });
        }).catch(err => {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription(`**Failed to move ${member.user.username}: ${err.message}**`);
            message.reply({ embeds: [embed] }).catch(error => console.log(error.message));
        });
    },
};
