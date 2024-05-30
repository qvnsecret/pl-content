const { MessageEmbed, MessageActionRow, MessageButton, Modal, TextInputComponent } = require('discord.js');

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
                    .setEmoji('📝')
                    .setStyle('PRIMARY'),
                new MessageButton()
                    .setCustomId('send_embed')
                    .setLabel('Send')
                    .setEmoji('📤')
                    .setStyle('SUCCESS')
            );

        // Send the embed with buttons
        const reply = await message.reply({ embeds: [initialEmbed], components: [row], ephemeral: true });

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
                        new TextInputComponent()
                            .setCustomId('embed_title')
                            .setLabel('Title')
                            .setStyle('SHORT')
                            .setRequired(false),
                        new TextInputComponent()
                            .setCustomId('embed_description')
                            .setLabel('Description')
                            .setStyle('PARAGRAPH')
                            .setRequired(false),
                        new TextInputComponent()
                            .setCustomId('embed_color')
                            .setLabel('Color')
                            .setStyle('SHORT')
                            .setRequired(false),
                        new TextInputComponent()
                            .setCustomId('embed_footer')
                            .setLabel('Footer')
                            .setStyle('SHORT')
                            .setRequired(false)
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

                interaction.message.embeds[0] = editedEmbed;
                await interaction.message.edit({ embeds: [editedEmbed] });
                await interaction.reply({ content: 'Embed edited successfully.', ephemeral: true });
            }
        });
    },
};
