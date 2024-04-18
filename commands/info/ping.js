const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    description: "Test the bot's response time.",
    aliases: [],

    run: async (client, message, args) => {
        const pingEmbed = new MessageEmbed()
            .setColor("#0099ff")
            .setDescription(`:green_circle: | ${client.ws.ping} ms`);

        message.reply({ embeds: [pingEmbed] });
    },
};
