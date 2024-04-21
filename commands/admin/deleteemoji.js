const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "deleteemoji",
    description: "Remove an emoji from the server by its name or ID.",
    run: async (client, message, args) => {
        // Check if the user has permission to manage emojis
        if (!message.member.permissions.has("MANAGE_EMOJIS_AND_STICKERS")) {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription("**You don't have permission to manage emojis.**");
            return message.reply({ embeds: [embed] });
        }

        // Ensure that an emoji name or ID is provided
        if (!args.length) {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription("**Please provide the name or ID of the emoji to remove.**");
            return message.reply({ embeds: [embed] });
        }

        // Find the emoji in the guild's emoji cache
        const emojiNameOrId = args[0];
        const emoji = message.guild.emojis.cache.find(e => e.name === emojiNameOrId || e.id === emojiNameOrId);
        if (!emoji) {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription("**Emoji not found.**");
            return message.reply({ embeds: [embed] });
        }

        // Attempt to delete the emoji
        emoji.delete()
            .then(() => {
                const embed = new MessageEmbed()
                    .setColor("#2b2d31")
                    .setDescription(`**${emoji.name} has been removed successfully.**`);
                message.reply({ embeds: [embed] });
            })
            .catch(error => {
                const embed = new MessageEmbed()
                    .setColor("#2b2d31")
                    .setDescription(`**Failed to remove emoji:** ${error.message}`);
                message.reply({ embeds: [embed] });
            });
    },
};
