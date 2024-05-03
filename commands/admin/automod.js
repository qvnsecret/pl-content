const { MessageEmbed, Permissions } = require("discord.js");
const db = require('quick.db'); // Ensure you have quick.db installed and properly set up

module.exports = {
    name: "automod",
    description: "Sets up or toggles the automatic moderation system for the server.",
    category: "Administration",
    usage: ".automod",
    run: async (client, message, args) => {
        // Ensure the command executor has administrative permissions
        if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
            return message.channel.send({ embeds: [new MessageEmbed().setColor("#2b2d31").setDescription("You do not have the necessary permissions to use this command.")] });
        }

        // Check if the server is already set up for automod
        const isSetup = db.get(`automod_setup_${message.guild.id}`);
        if (isSetup) {
            return message.channel.send({ embeds: [new MessageEmbed().setColor("#2b2d31").setDescription("AutoMod is already configured on this server.")] });
        }

        try {
            // Example: Creating a quarantine role
            let quarantineRole = await message.guild.roles.create({
                name: "Quarantine",
                color: "RED",
                permissions: []
            });

            // Save the quarantine role ID to the database for future use
            db.set(`qrole_${message.guild.id}`, quarantineRole.id);
            db.set(`automod_setup_${message.guild.id}`, true); // Mark the server as set up

            message.channel.send({ embeds: [new MessageEmbed().setColor("#2b2d31").setDescription("AutoMod has been successfully configured.")]});
        } catch (error) {
            console.error("Failed to set up AutoMod:", error);
            message.channel.send({ embeds: [new MessageEmbed().setColor("#2b2d31").setDescription("Failed to configure AutoMod. Please check the bot's permissions and try again.")]});
        }
    }
};
