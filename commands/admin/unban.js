const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "unban",
    description: "Unbans a member from the server.",
    run: async (client, message, args) => {
        const permission = message.member.permissions.has("BAN_MEMBERS");
        const botPermission = message.guild.me.permissions.has("BAN_MEMBERS");

        if (!permission) {
            return message.reply({
                embeds: [new MessageEmbed()
                    .setColor("#2b2d31")
                    .setDescription("You don't have permission to unban members.")]
            }).catch(console.error);
        }

        if (!botPermission) {
            return message.reply({
                embeds: [new MessageEmbed()
                    .setColor("#2b2d31")
                    .setDescription("I don't have permission to unban members. Please check my role position.")]
            }).catch(console.error);
        }

        if (!args[0]) {
            return message.reply({
                embeds: [new MessageEmbed()
                    .setColor("#2b2d31")
                    .setDescription("Please provide the ID of the member to unban.")]
            }).catch(console.error);
        }

        message.guild.members.unban(args[0]).then(user => {
            message.reply({
                embeds: [new MessageEmbed()
                    .setColor("#2b2d31")
                    .setDescription(`${user.tag} has been unbanned successfully.`)]
            });
        }).catch(err => {
            message.reply({
                embeds: [new MessageEmbed()
                    .setColor("#2b2d31")
                    .setDescription("I can't find that user in the ban list or an error occurred.")]
            }).catch(console.error);
        });
    },
};
