const { MessageEmbed, MessageActionRow, MessageButton, Modal, TextInputComponent, TextInputStyle } = require('discord.js');

module.exports = {
    name: "embed",
    description: "Create and send a customizable embed message.",
    run: async (client, interaction) => {
        // Create the initial embed with a placeholder text
        const initialEmbed = new MessageEmbed()
            .setDescription('This is a placeholder embed. Use the buttons below to edit and send.')
            .setColor('#2b2d31');

        // Create the buttons
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('edit_embed')
                    .setLabel('Edit')
                    .setStyle('PRIMARY'),
                new MessageButton()
                    .setCustomId('send_embed')
                    .setLabel('Send')
                    .setEmoji('📤')
                    .setStyle('SUCCESS')
            );

        // Send the embed with buttons
        const reply = await interaction.reply({ embeds: [initialEmbed], components: [row], fetchReply: true });

        // Handle button clicks
        const filter = (btnInteraction) => btnInteraction.user.id === interaction.user.id;
        const collector = reply.createMessageComponentCollector({ filter, componentType: 'BUTTON', time: 60000 });

        collector.on('collect', async (btnInteraction) => {
            if (btnInteraction.customId === 'edit_embed') {
                // Create a modal for editing the embed
                const modal = new Modal()
                    .setCustomId('edit_embed_modal')
                    .setTitle('Edit Embed')
                    .addComponents(
                        new MessageActionRow().addComponents(
                            new TextInputComponent()
                                .setCustomId('embed_title')
                                .setLabel('Title')
                                .setStyle(TextInputStyle.SHORT)
                                .setRequired(false)
                        ),
                        new MessageActionRow().addComponents(
                            new TextInputComponent()
                                .setCustomId('embed_description')
                                .setLabel('Description')
                                .setStyle(TextInputStyle.PARAGRAPH)
                                .setRequired(false)
                        ),
                        new MessageActionRow().addComponents(
                            new TextInputComponent()
                                .setCustomId('embed_color')
                                .setLabel('Color')
                                .setStyle(TextInputStyle.SHORT)
                                .setRequired(false)
                        ),
                        new MessageActionRow().addComponents(
                            new TextInputComponent()
                                .setCustomId('embed_footer')
                                .setLabel('Footer')
                                .setStyle(TextInputStyle.SHORT)
                                .setRequired(false)
                        )
                    );

                await btnInteraction.showModal(modal);
            }

            if (btnInteraction.customId === 'send_embed') {
                const editedEmbed = btnInteraction.message.embeds[0];

                if (!editedEmbed.title && !editedEmbed.description) {
                    await btnInteraction.reply({ content: 'Error: You must edit the embed before sending.', ephemeral: true });
                    return;
                }

                await interaction.channel.send({ embeds: [editedEmbed] });
                await btnInteraction.reply({ content: 'Embed sent successfully.', ephemeral: true });
            }
        });

        client.on('interactionCreate', async (modalInteraction) => {
            if (!modalInteraction.isModalSubmit()) return;

            if (modalInteraction.customId === 'edit_embed_modal') {
                const title = modalInteraction.fields.getTextInputValue('embed_title');
                const description = modalInteraction.fields.getTextInputValue('embed_description');
                const color = modalInteraction.fields.getTextInputValue('embed_color') || '#2b2d31';
                const footer = modalInteraction.fields.getTextInputValue('embed_footer');

                const editedEmbed = new MessageEmbed()
                    .setColor(color);

                if (title) editedEmbed.setTitle(title);
                if (description) editedEmbed.setDescription(description);
                if (footer) editedEmbed.setFooter(footer);

                await modalInteraction.message.edit({ embeds: [editedEmbed] });
                await modalInteraction.reply({ content: 'Embed edited successfully.', ephemeral: true });
            }
        });
    },
};
