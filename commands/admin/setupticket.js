const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");

module.exports = {
    name: "setupticket",
    description: "Sets up a ticket system with an interactive button.",
    async execute(client, message, args) {
        const ticketSetupChannel = message.mentions.channels.first() || message.channel; // Use mentioned channel or current channel

        const embed = new MessageEmbed()
            .setColor("#2b2d31")
            .setTitle("Support Tickets")
            .setDescription("Click the button below to create a ticket!");

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId("create_ticket")
                    .setLabel("Create Ticket")
                    .setStyle("PRIMARY")
            );

        // Send the embed with the button
        ticketSetupChannel.send({ embeds: [embed], components: [row] });
    }
};
