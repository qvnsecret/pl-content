const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "untimeout",
    description: "Removes timeout from a member.",
    run: async (client, message, args) => {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        const permission = message.member.permissions.has("MODERATE_MEMBERS");
        const botPermission = message.guild.me.permissions.has("MODERATE_MEMBERS");

        if (!permission) {
            return message.reply({
                embeds: [new MessageEmbed().setColor("#2b2d31").setDescription("You don't have permission to untimeout members.")]
            }).catch(console.error);
        }

        if (!botPermission) {
            return message.reply({
                embeds: [new MessageEmbed().setColor("#2b2d31").setDescription("I don't have permission to untimeout members. Please check my role position.")]
            }).catch(console.error);
        }

        if (!args[0] || !member) {
            return message.reply({
                embeds: [new MessageEmbed().setColor("#2b2d31").setDescription("Please mention a valid member or provide their ID.")]
            }).catch(console.error);
        }

        if (member.id === message.author.id) {
            return message.reply({
                embeds: [new MessageEmbed().setColor("#2b2d31").setDescription("You cannot untimeout yourself.")]
            }).catch(console.error);
        }

        if (message.member.roles.highest.position <= member.roles.highest.position) {
            return message.reply({
                embeds: [new MessageEmbed().setColor("#2b2d31").setDescription(`You cannot untimeout ${member.user.username} as they have a higher role than you.`)]
            }).catch(console.error);
        }

        // Properly untimeout a member by setting their timeout to null
        member.timeout(null, `Untimed out by: ${message.author.tag}`)
            .then(() => {
                message.reply({
                    embeds: [new MessageEmbed().setColor("#2b2d31").setDescription(`${member.user.username} has been untimed out successfully.`)]
                });
            }).catch(err => {
                console.error(err);
                message.reply({
                    embeds: [new MessageEmbed().setColor("#2b2d31").setDescription("Failed to untimeout the member, please check the logs for more details.")]
                }).catch(console.error);
            });
    },
};
