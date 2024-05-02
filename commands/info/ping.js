const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    description: "Test the bot's response time.",
    aliases: [],

    run: async (client, message, args) => {
        const pingEmbed = new MessageEmbed()
            .setColor("#FF3A3A")
            .setDescription(`<:ping:1233853207323611236> Response time ${client.ws.ping} ms. For any bug report [here](https://discord.gg/dpxybg8ZbD)`);

        message.reply({ embeds: [pingEmbed] });
    },
};
