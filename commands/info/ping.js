const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    description: "Test the bot's response time.",
    aliases: [],

    run: async (client, message, args) => {
        const pingEmbed = new MessageEmbed()
            .setColor("#2b2d31")
            .setDescription(`Response time: ${client.ws.ping} ms. For any bug report [here](https://discord.gg/dpxybg8ZbD)`);

        message.reply({ embeds: [pingEmbed] });
    },
};
