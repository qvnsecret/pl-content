const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");

module.exports = {
    name: "closeticket",
    description: "Closes the current ticket with confirmation.",
    async execute(client, message, args) {
        if (!message.channel.name.startsWith('ticket-')) {
            return message.channel.send("This command can only be used within a ticket channel.");
        }

        const embed = new MessageEmbed()
            .setColor("#2b2d31")
            .setTitle("Are you sure you want to close this ticket?")
            .setDescription("Confirm that you want to close this ticket. This action is irreversible!");

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId("confirm_close_ticket")
                    .setLabel("Confirm")
                    .setStyle("DANGER"),
                new MessageButton()
                    .setCustomId("cancel_close_ticket")
                    .setLabel("Cancel")
                    .setStyle("SECONDARY")
            );

        message.channel.send({ embeds: [embed], components: [row] });
    }
};
