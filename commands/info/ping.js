const { Message, Client } = require("discord.js");

module.exports = {
        name: "ping",
        description: `Test the bots response time.`,
        aliases: [],
        run: async (client, message, args) => {
                message.reply({ content:`**<:tick:1220474968031105094> | Pong ${client.ws.ping} ms**`});
        },
};