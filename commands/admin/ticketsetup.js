const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: "ticketsetup",
    category: 'Ticket 🎫',
    description: "Sets up a ticket system in the channel.",
    utilisation: '{prefix}ticketsetup',

    async execute(client, message, args) {
        if (!message.member.permissions.has("MANAGE_CHANNELS")) {
            return message.reply({
                embeds: [new MessageEmbed()
                    .setColor("#2b2d31")
                    .setDescription("You don't have permission to set up tickets.")]
            });
        }

        const button = new MessageButton()
            .setCustomId('create_ticket')
            .setLabel('Create Ticket')
            .setStyle('PRIMARY')
            .setEmoji('🎟️');

        const row = new MessageActionRow().addComponents(button);

        const setupEmbed = new MessageEmbed()
            .setColor("#2b2d31")
            .setTitle('Ticket System')
            .setDescription('Click the button below to create a new ticket.')
            .setFooter('Ticket system setup');

        message.channel.send({ embeds: [setupEmbed], components: [row] });
    }
};
