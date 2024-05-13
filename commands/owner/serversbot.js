const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "serversbot",
    description: "Displays information about servers where the bot is present.",
    run: async (client, message, args) => {
        // Your Discord ID as the bot owner
        const ownerId = "1213850979964035114";

        // Check if the user invoking the command is the owner of the bot
        if (message.author.id !== ownerId) {
            return message.reply("You do not have permission to use this command.");
        }

        // Fetch all the guilds where the bot is present
        const guilds = client.guilds.cache.array();

        // Create an array to store information about each guild
        const guildInfo = [];

        // Iterate through each guild
        guilds.forEach(guild => {
            // Construct an invite link for the guild
            guild.invite = `https://discord.gg/${guild.fetchInvites().then(invites => invites.first().code).catch(console.error)}`;

            // Get the number of members and boosts in the guild
            const memberCount = guild.memberCount;
            const boostCount = guild.premiumSubscriptionCount;

            // Push guild information to the array
            guildInfo.push({
                name: guild.name,
                invite: guild.invite,
                memberCount,
                boostCount
            });
        });

        // Create an embed to display the guild information
        const embed = new MessageEmbed()
            .setColor("#2b2d31")
            .setTitle("Server List")
            .setDescription(guildInfo.map(guild => `**[${guild.name}](${guild.invite})** - Members: ${guild.memberCount}, Boosts: ${guild.boostCount}`).join("\n"));

        // Send the embed with the guild information
        message.channel.send({ embeds: [embed] });
    },
};
