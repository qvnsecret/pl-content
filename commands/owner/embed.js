const { MessageEmbed, MessageActionRow, MessageButton, Modal, TextInputComponent, TextInputStyle, InteractionType } = require('discord.js');

module.exports = {
    name: "embed",
    description: "Create and send a customizable embed message.",
    run: async (client, message, args) => {
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
        const reply = await message.reply({ embeds: [initialEmbed], components: [row] });

        // Handle button clicks
        const filter = (interaction) => interaction.user.id === message.author.id;
        const collector = reply.createMessageComponentCollector({ filter, componentType: 'BUTTON', time: 60000 });

        collector.on('collect', async (interaction) => {
            if (interaction.customId === 'edit_embed') {
                // Create a modal for editing the embed
                const modal = new Modal()
                    .setCustomId('edit_embed_modal')
                    .setTitle('Edit Embed')
                    .addComponents(
                        new MessageActionRow().addComponents(
                            new TextInputComponent()
                                .setCustomId('embed_title')
                                .setLabel('Title')
                                .setStyle(TextInputStyle.Short)
                                .setRequired(false)
                        ),
                        new MessageActionRow().addComponents(
                            new TextInputComponent()
                                .setCustomId('embed_description')
                                .setLabel('Description')
                                .setStyle(TextInputStyle.Paragraph)
                                .setRequired(false)
                        ),
                        new MessageActionRow().addComponents(
                            new TextInputComponent()
                                .setCustomId('embed_color')
                                .setLabel('Color')
                                .setStyle(TextInputStyle.Short)
                                .setRequired(false)
                        ),
                        new MessageActionRow().addComponents(
                            new TextInputComponent()
                                .setCustomId('embed_footer')
                                .setLabel('Footer')
                                .setStyle(TextInputStyle.Short)
                                .setRequired(false)
                        )
                    );

                await interaction.showModal(modal);
            }

            if (interaction.customId === 'send_embed') {
                const editedEmbed = interaction.message.embeds[0];

                if (!editedEmbed.title && !editedEmbed.description) {
                    await interaction.reply({ content: 'Error: You must edit the embed before sending.', ephemeral: true });
                    return;
                }

                await message.channel.send({ embeds: [editedEmbed] });
                await interaction.reply({ content: 'Embed sent successfully.', ephemeral: true });
            }
        });

        client.on('interactionCreate', async (interaction) => {
            if (!interaction.isModalSubmit()) return;

            if (interaction.customId === 'edit_embed_modal') {
                const title = interaction.fields.getTextInputValue('embed_title');
                const description = interaction.fields.getTextInputValue('embed_description');
                const color = interaction.fields.getTextInputValue('embed_color') || '#2b2d31';
                const footer = interaction.fields.getTextInputValue('embed_footer');

                const editedEmbed = new MessageEmbed()
                    .setColor(color);

                if (title) editedEmbed.setTitle(title);
                if (description) editedEmbed.setDescription(description);
                if (footer) editedEmbed.setFooter(footer);

                await interaction.message.edit({ embeds: [editedEmbed] });
                await interaction.reply({ content: 'Embed edited successfully.', ephemeral: true });
            }
        });
    },
};
