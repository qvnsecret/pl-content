const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Feeling lost?'),
    async execute(interaction) {
        try {
            const menu = new MessageActionRow()
                .addComponents(
                    new MessageSelectMenu()
                        .setCustomId('help_menu')
                        .setPlaceholder('Choose a category')
                        .addOptions([
                            {
                                label: 'Info',
                                description: 'View info commands',
                                value: 'info'
                            },
                            {
                                label: 'Owner',
                                description: 'View owner commands',
                                value: 'owner'
                            },
                            {
                                label: 'Admin',
                                description: 'View admin commands',
                                value: 'admin'
                            }
                        ])
                );

            const embed = new MessageEmbed()
                .setTitle('Help Menu')
                .setDescription('Select a category from the dropdown menu to view commands.')
                .setColor('RANDOM');

            await interaction.reply({ embeds: [embed], components: [menu] });
        } catch (error) {
            console.error('Error executing slash command:', error);
            await interaction.reply('There was an error while executing this command.');
        }
    },
};
