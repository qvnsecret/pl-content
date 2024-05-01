const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: "ticketsetup",
    cooldown: 5,
    aliases: ["tic", "tsetup", "setupt"],
    category: 'Ticket 🎫',
    description: "Setup ticket channel",
    utilisation: '.ticketsetup',

    async execute(client, message, args) {
        // Checking for permissions to manage messages
        if (!message.member.permissions.has("MANAGE_MESSAGES")) {
            return message.reply({ embeds: [new MessageEmbed().setColor("#2b2d31").setDescription("You do not have permission to use this command.")] });
        }

        // Ensure that the ticket channel and admin role are mentioned
        var ticketChannel = message.mentions.channels.first();
        var adminRole = message.mentions.roles.first();
        var title = args.slice(2).join(' ') || 'Ticket Bot';

        if (!ticketChannel || !adminRole) {
            return message.reply({
                embeds: [new MessageEmbed()
                    .setColor("#2b2d31")
                    .setDescription("Usage: .ticketsetup <#TicketChannel> <@AdminRole> [Optional Title]")]
            });
        }

        // Setting up the ticket creation message
        const button = new MessageButton()
            .setStyle('PRIMARY')
            .setLabel('Create Ticket')
            .setEmoji('🎟️')
            .setCustomId('createTicket');

        const row = new MessageActionRow().addComponents(button);

        const initialMessageEmbed = new MessageEmbed()
            .setColor('#2b2d31')
            .setDescription('Click the button below to create a ticket.')
            .setTitle(title);

        ticketChannel.send({
            embeds: [initialMessageEmbed],
            components: [row]
        }).then(() => {
            message.reply({
                embeds: [new MessageEmbed()
                    .setColor("#2b2d31")
                    .setDescription(`Ticket system setup complete in ${ticketChannel}`)]
            });
        }).catch(err => {
            console.error(err);
            message.channel.send({ embeds: [new MessageEmbed().setColor("#2b2d31").setDescription("Failed to set up the ticket system.")] });
        });
    }
};
