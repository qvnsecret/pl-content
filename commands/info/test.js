const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "test",
    description: "Developer only",
    run: async (client, message, args) => {
        // Check if the message author's ID matches the stored owner ID
        if (message.author.id !== client.ownerID) {
            const embed = new MessageEmbed()
                .setTitle("Unauthorized Access")
                .setDescription("This command can only be used by the bot owner.")
                .setColor("#00FF00")  // Red color to indicate an error or restricted access
                .setTimestamp();

            return message.reply({ embeds: [embed] });
        }

        // Proceed with the command if the user is the owner
        const embed = new MessageEmbed()
            .setTitle("Authorized Access")
            .setDescription("Welcome, owner! What can I do for you today?")
            .setColor("#00FF00")  // Green color to indicate success
            .setTimestamp();

        message.reply({ embeds: [embed] });
    },
};
