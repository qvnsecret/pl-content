const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "TEST",
    description: "A command that only the bot owner can use.",
    run: async (client, message, args) => {
        // Replace 'YOUR_USER_ID' with your actual Discord User ID
        const ownerID = '1213850979964035114';

        if (message.author.id !== ownerID) {
            const embed = new MessageEmbed()
                .setTitle("Unauthorized Access")
                .setDescription(":x: This command can only be used by the bot owner.")
                .setColor("#FF3A3A")  // Red color to indicate an error or restricted access
                .setTimestamp();

            return message.reply({ embeds: [embed] });
        }

        // If the user is the owner, proceed with the command
        const embed = new MessageEmbed()
            .setTitle("Authorized Access")
            .setDescription("🔱 | ```A``` `B` **C** *D*")
            .setColor("#FF3A3A")  // Green color to indicate success
            .setTimestamp();

        message.reply({ embeds: [embed] });
    },
};

