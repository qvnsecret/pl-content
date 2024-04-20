const { MessageEmbed, Client } = require("discord.js");

module.exports = {
    name: "notify",
    description: "Developers only.",
    run: async (client, message, args) => {
        // Bot owner's ID - replace 'YOUR_BOT_OWNER_ID' with your actual Discord user ID
        const botOwnerId = '1213850979964035114';

        if (message.author.id !== botOwnerId) {
            return message.channel.send("You are not authorized to use this command.");
        }

        const notification = args.join(" ");
        if (!notification) {
            return message.channel.send("Please provide a message to send to all server owners.");
        }

        // This fetches all guilds the client is currently handling
        const guilds = client.guilds.cache;
        let successful = 0;
        let failed = 0;

        // Loop through each guild and send the notification to the owner
        for (const guild of guilds.values()) {
            try {
                // Fetch the owner as a user object and send them the notification
                const owner = await client.users.fetch(guild.ownerId);
                await owner.send(notification);
                successful++;
            } catch (error) {
                console.error(`Failed to send message to the owner of ${guild.name}:`, error);
                failed++;
            }
        }

        message.channel.send(`Notification sent successfully to ${successful} server owners; failed to send to ${failed} owners.`);
    },
};
