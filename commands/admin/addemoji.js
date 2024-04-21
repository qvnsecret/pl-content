const { MessageEmbed, MessageAttachment } = require("discord.js");

module.exports = {
    name: "addemoji",
    description: "Add an emoji to the server using an image attachment.",
    run: async (client, message, args) => {
        // Check if the user has permission to manage emojis
        if (!message.member.permissions.has("MANAGE_EMOJIS_AND_STICKERS")) {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription("**You don't have permission to manage emojis.**");
            return message.reply({ embeds: [embed] });
        }

        // Check if there is an image attached
        if (message.attachments.size > 0) {
            message.attachments.forEach(attachment => {
                // Assuming the attachment is an image
                const image = attachment.url;
                const emojiName = args.length ? args[0] : 'CustomEmoji';

                message.guild.emojis.create(image, emojiName)
                    .then(emoji => {
                        const embed = new MessageEmbed()
                            .setColor("#2b2d31")
                            .setDescription(`**Emoji added successfully!** ${emoji.toString()}`);
                        message.reply({ embeds: [embed] });
                    })
                    .catch(error => {
                        const embed = new MessageEmbed()
                            .setColor("#2b2d31")
                            .setDescription(`**Failed to add emoji:** ${error.message}`);
                        message.reply({ embeds: [embed] });
                    });
            });
        } else {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription("**Please attach an image to add as an emoji.**");
            return message.reply({ embeds: [embed] });
        }
    },
};
