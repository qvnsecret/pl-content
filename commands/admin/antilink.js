const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "antilink",
    description: "Configures the anti-link settings.",
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
            // Remove the message and send a message with a warning
            message.delete().catch(console.error);
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription(`<@${message.author.id}>, you can't send links here.`)
                .setTimestamp()
                .setFooter(`Anti-link settings configured by ${message.author.tag}`);
            message.channel.send({ embeds: [embed] }).catch(err => console.log(`I couldn't send the message: ${err.message}`));
        } else {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription("**Anti-link settings configured.**");
            message.reply({ embeds: [embed], ephemeral: true }).catch(err => console.log(`I couldn't reply to the message: ${err.message}`));
        }
    },
};
