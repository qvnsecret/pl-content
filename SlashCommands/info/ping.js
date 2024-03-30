const { Message, Client, CommandInteraction } = require("discord.js");

module.exports = {
        name: "ping",
        description: `Test the bots response time.`,
        type: 'CHAT_INPUT',
  
        run: async (client, interaction, args) => {
    interaction.followUp({ content: `:ping_pong: **Pong ${client.ws.ping} ms**` });
    },
};