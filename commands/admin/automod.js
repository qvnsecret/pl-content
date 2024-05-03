const { MessageEmbed, Permissions } = require("discord.js");

module.exports = {
    name: "automod",
    description: "Sets up or toggles the automatic moderation system for the server.",
    category: "Administration",
    usage: ".automod",
    run: async (client, message, args) => {
        if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
            return message.reply({
                embeds: [new MessageEmbed()
                    .setColor("#2b2d31")
                    .setDescription("You do not have the necessary permissions to use this command.")]
            });
        }

        // Check if the server is already set up for automod
        const isSetup = await client.data.get(`automod_setup_${message.guild.id}`);
        if (isSetup) {
            return message.reply({
                embeds: [new MessageEmbed()
                    .setColor("#2b2d31")
                    .setDescription("AutoMod is already configured on this server.")]
            });
        }

        // Perform setup actions, such as creating roles, setting permissions, etc.
        try {
            // Example: Create a quarantine role
            let quarantineRole = await message.guild.roles.create({
                name: "Quarantine",
                color: "RED",
                permissions: []
            });

            // Store the role in the database or cache
            await client.data.set(`qrole_${message.guild.id}`, quarantineRole.id);

            // Mark the server as set up
            await client.data.set(`automod_setup_${message.guild.id}`, true);

            message.reply({
                embeds: [new MessageEmbed()
                    .setColor("#2b2d31")
                    .setDescription("AutoMod has been successfully configured.")]
            });
        } catch (error) {
            console.error("Failed to set up AutoMod:", error);
            message.reply({
                embeds: [new MessageEmbed()
                    .setColor("#2b2d31")
                    .setDescription("Failed to configure AutoMod. Please check the bot's permissions and try again.")]
            });
        }
    }
};
