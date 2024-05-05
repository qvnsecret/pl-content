const { MessageActionRow, MessageButton, MessageEmbed, Permissions } = require("discord.js");

module.exports = {
    name: "setupticket",
    description: "Sets up a ticket system in the channel where the command is run.",
    permissions: ["ADMINISTRATOR"], // Optional: Restrict command to admins only
    async execute(client, message, args) {
        // Check if the bot has permission to manage channels
        if (!message.guild.me.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) {
            return message.channel.send("I need permissions to manage channels to setup tickets.");
        }

        // Embed setup
        const embed = new MessageEmbed()
            .setColor("#2b2d31")
            .setTitle("Create a Ticket")
            .setDescription("Click the button below to create a new support ticket.")
            .setFooter("Ticket System");

        // Button setup
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId("create_ticket")
                    .setLabel("Create Ticket")
                    .setStyle("PRIMARY")
                    .setEmoji("🎫")
            );

        // Send the message with the button
        message.channel.send({ embeds: [embed], components: [row] });
    }
};
