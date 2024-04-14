const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } = require('discord.js');
const { glob } = require('glob');
const { promisify } = require('util');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Feeling lost?'),
    async execute(interaction) {
        try {
            const globPromise = promisify(glob);
            const adminFiles = await globPromise(`${process.cwd()}/commands/admin/**/*.js`);
            const infoFiles = await globPromise(`${process.cwd()}/commands/info/**/*.js`);
            const ownerFiles = await globPromise(`${process.cwd()}/commands/owner/**/*.js`);

            const menu = new MessageActionRow()
                .addComponents(
                    new MessageSelectMenu()
                        .setCustomId(`help_${interaction.user.id}`)
                        .setPlaceholder('Choose a category')
                        .addOptions([
                            {
                                label: 'Info',
                                description: 'To view the info commands',
                                value: 'info',
                                emoji: '📚',
                            },
                            {
                                label: 'Owner',
                                description: 'To view the owner commands',
                                value: 'owner',
                                emoji: '👑',
                            },
                            {
                                label: 'Admin',
                                description: 'To view the admin commands',
                                value: 'admin',
                                emoji: '🛠️',
                            },
                        ])
                );

            const buttonRow = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setStyle('LINK')
                        .setLabel('Bug Server')
                        .setURL('https://discord.gg/n2DR6VJtgP'),
                    new MessageButton()
                        .setStyle('LINK')
                        .setLabel('Server Support')
                        .setURL('https://discord.com/invite/886Z9JUdXY')
                );

            const embed = new MessageEmbed()
                .setTitle('**Aesthetical**')
                .setDescription(`**If you have any questions, contact *ogqvnrvx* or our Bug Server!**\nBot Prefix: ${interaction.client.config.prefix}help`)
                .setThumbnail('https://cdn.discordapp.com/attachments/1223568250810404925/1223568278719561769/noFilter.png')
                .setImage('https://cdn.discordapp.com/attachments/1218607459925753969/1229064062051291297/discordstatus_4.png')
                .setFooter('This bot isn\'t made by the official roblox Aesthetical. This bot was made for educational purposes only.')
                .setColor(interaction.guild.me.displayHexColor)
                .setTimestamp();

            const reply = await interaction.reply({ embeds: [embed], components: [menu, buttonRow], fetchReply: true });

            const filter = (interaction) => interaction.user.id === interaction.user.id && interaction.isSelectMenu();
            const collector = reply.createMessageComponentCollector({ filter, time: 120000 });

            collector.on('collect', async (b) => {
                let embed_1 = new MessageEmbed().setColor(interaction.guild.me.displayHexColor).setTimestamp();

                switch (b.values[0]) {
                    case 'admin':
                        await Promise.all(adminFiles.map(async (value) => {
                            const file = require(value);
                            const directory = value.split('/').slice(-2, -1)[0];

                            if (file.name) {
                                const { name, description } = file;
                                embed_1.addField(`${interaction.client.config.prefix}${name}`, `${description}`, true);
                            }
                        }));
                        break;
                    case 'info':
                        await Promise.all(infoFiles.map(async (value) => {
                            const file = require(value);
                            const directory = value.split('/').slice(-2, -1)[0];

                            if (file.name) {
                                const { name, description } = file;
                                embed_1.addField(`${interaction.client.config.prefix}${name}`, `${description}`, true);
                            }
                        }));
                        break;
                    case 'owner':
                        await Promise.all(ownerFiles.map(async (value) => {
                            const file = require(value);
                            const directory = value.split('/').slice(-2, -1)[0];

                            if (file.name) {
                                const { name, description } = file;
                                embed_1.addField(`${interaction.client.config.prefix}${name}`, `${description}`, true);
                            }
                        }));
                        break;
                }

                await b.update({ embeds: [embed_1], components: [menu, buttonRow] });
            });
        } catch (error) {
            console.error('Error executing slash command:', error);
            await interaction.reply('There was an error while executing this command.');
        }
    },
};
