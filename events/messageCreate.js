const client = require("../index");
const db = require('quick.db');  // Ensure you're using this database appropriately elsewhere in your code.

client.on("messageCreate", async (message) => {
    // Ignore all bots including itself, messages not from guilds, or messages that do not start with the prefix.
    if (message.author.bot || !message.guild || !message.content.toLowerCase().startsWith(client.config.prefix))
        return;

    // Split message into command and arguments.
    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/);
    const cmd = args.shift().toLowerCase();  // Extract the command from the args array and convert to lower case.

    // Fetch the command by name or alias.
    const command = client.commands.get(cmd) || client.commands.find(c => c.aliases && c.aliases.includes(cmd));

    // If no command is found, stop processing.
    if (!command) return;

    try {
        // Run the command if found.
        await command.run(client, message, args);
    } catch (error) {
        console.error("Error executing command:", error);
        message.reply("An error occurred while executing that command.");  // Optionally inform the user about the error.
    }
});
