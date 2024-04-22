const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    description: "Test the bot's response time.",
    type: 'CHAT_INPUT', // This line is unnecessary as 'CHAT_INPUT' is the default type and doesn't need to be explicitly stated

    /**
     * This function runs when the slash command is executed.
     * @param {Client} client - The Discord client.
     * @param {CommandInteraction} interaction - The interaction object.
     */
    run: async (client, interaction) => {
        // Create a new embed with a dynamic response time message
        const pingEmbed = new MessageEmbed()
            .setColor("#2b2d31")
            .setDescription(`Response time: ${client.ws.ping} ms. For any bug report, click [here](https://discord.gg/dpxybg8ZbD)`);

        // Send an initial response to the interaction
        await interaction.reply({ content: 'Calculating ping...' });

        // Edit the reply to show the ping embed
        await interaction.editReply({ content: ' ', embeds: [pingEmbed] });
    },
};
