const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "help",
    description: "Displays general information about the bot.",
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
            .setTitle("Bot Information")
            .setDescription("Learn more about what this bot can do and how to use it!")
            .setColor("#0099ff")
            .addField("Commands", "Use `.commandName` to interact with me!")
            .addField("Support", "Need help? Contact our support team!")
            .setFooter("Thank you for using our bot!")
            .setTimestamp();

        message.channel.send({ embeds: [embed] });
    },
};
