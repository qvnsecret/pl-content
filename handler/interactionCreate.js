client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;

    if (interaction.customId === "create_ticket") {
        const supportCategory = interaction.guild.channels.cache.find(c => c.name === "Support Tickets" && c.type === "GUILD_CATEGORY");
        if (!supportCategory) {
            return interaction.reply({ content: "Support Ticket category does not exist! Please create one.", ephemeral: true });
        }

        const ticketChannel = await interaction.guild.channels.create(`ticket-${interaction.user.tag}`, {
            type: 'GUILD_TEXT',
            parent: supportCategory.id,
            permissionOverwrites: [
                {
                    id: interaction.guild.id,
                    deny: ['VIEW_CHANNEL'],
                },
                {
                    id: interaction.user.id,
                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'],
                }
            ],
        });

        ticketChannel.setTopic(`Ticket Owner: ${interaction.user.id}`);

        interaction.reply({ content: `Your ticket has been created! <#${ticketChannel.id}>`, ephemeral: true });
    }
});
