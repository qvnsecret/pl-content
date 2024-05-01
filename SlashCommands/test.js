const { Message, Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "test",
    description: "Testing Slash Commands",
    type: 'CHAT_INPUT',

    run: async (client, interaction, args) => {
        const pingEmbed = new MessageEmbed()
            .setColor("#2b2d31")
            .setDescription(`It works);

        interaction.followUp({ embeds: [pingEmbed] });
    },
};
