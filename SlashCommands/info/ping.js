const { Message, Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    description: "Test the bot's response time.",
    type: 'CHAT_INPUT',

    run: async (client, interaction, args) => {
        const pingEmbed = new MessageEmbed()
            .setColor("#2b2d31")
            .setDescription(`Response time: ${client.ws.ping} ms. For any bug report [here](https://discord.gg/dpxybg8ZbD)`);

        interaction.followUp({ embeds: [pingEmbed] });
    },
};
