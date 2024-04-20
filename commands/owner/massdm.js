const { Message } = require("discord.js");

module.exports = {
    name: "massdm",
    description: "Send a DM to all members of the server.",
    aliases: ["mass"],
    run: async (client, message, args) => {
        // Check if the command issuer is the server owner
        if (message.author.id !== message.guild.ownerId) {
            return message.channel.send("Only the server owner can use this command.");
        }

        const announcement = args.join(" ");
        if (!announcement) return message.channel.send("Please provide a message to send.");

        const members = message.guild.members.cache.filter(member => !member.user.bot && member.user.id !== client.user.id);

        let successful = 0;
        let failed = 0;

        members.forEach(member => {
            member.send(announcement)
                .then(() => successful++)
                .catch(error => {
                    console.error(`Could not send DM to ${member.user.tag}.`);
                    failed++;
                });
        });

        // This response could be sent after a delay or upon completion of the DM sends
        message.channel.send(`Messages are being sent... Successfully sent: ${successful}, Failed: ${failed}`);
    },
};
