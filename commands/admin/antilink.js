const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "antilink",
    description: "Blocks or removes links and sends a warning message.",
    run: async (client, message, args) => {
        const permission = message.member.permissions.has("MANAGE_MESSAGES");

        if (!permission) {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription("**You don't have permission to use this command**");
            return message.reply({ embeds: [embed], ephemeral: true }).catch(err => console.log(`I couldn't reply to the message: ${err.message}`));
        }

        // Check if the message content contains a link
        const linkRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
        if (linkRegex.test(message.content)) {
            // Remove the link and send a message with a warning
            const noLinkMessage = message.content.replace(linkRegex, '**[LINK REMOVED]**');
            message.reply({
                content: `<@${message.author.id}>, you can't send links here.`,
                allowedMentions: { parse: ['users'], repliedUser: true },
            }).then(() => {
                message.edit({ content: noLinkMessage }).catch(console.error);
            });
        } else {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription("**No link found in the message.**");
            message.reply({ embeds: [embed], ephemeral: true }).catch(err => console.log(`I couldn't reply to the message: ${err.message}`));
        }
    },
};
