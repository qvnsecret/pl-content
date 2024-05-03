const { MessageEmbed, Permissions } = require("discord.js");
const db = require('quick.db'); // Assuming using quick.db for database operations

module.exports = {
    name: "automod",
    description: "Activates or configures the automatic moderation system with safety setups.",
    category: "Administration",
    usage: ".automod",

    run: async (client, message, args) => {
        // Check if the user has the administrator permission
        if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
            return message.channel.send({ embeds: [new MessageEmbed().setColor("#2b2d31").setDescription("You do not have the necessary permissions to use this command.")] });
        }

        // Check if the server is already set up for AutoMod
        const isSetup = db.get(`automod_setup_${message.guild.id}`);
        if (isSetup) {
            return message.channel.send({ embeds: [new MessageEmbed().setColor("#2b2d31").setDescription("AutoMod is already configured on this server.")] });
        }

        try {
            // Create a quarantine role with no permissions to send messages or speak
            const quarantineRole = await message.guild.roles.create({
                data: {
                    name: "Quarantine",
                    color: "DARK_RED",
                    permissions: []
                },
                reason: 'Used to quarantine users in case of rule violations'
            });

            // Save setup to the database
            db.set(`automod_setup_${message.guild.id}`, true);
            db.set(`qrole_${message.guild.id}`, quarantineRole.id);

            // Response to the user
            message.channel.send({ embeds: [new MessageEmbed().setColor("#2b2d31").setDescription("AutoMod has been successfully configured with safety measures.")]});
        } catch (error) {
            console.error("Failed to set up AutoMod:", error);
            message.channel.send({ embeds: [new MessageEmbed().setColor("#2b2d31").setDescription("Failed to configure AutoMod. Please check the bot's permissions and try again.")]});
        }
    }
};
