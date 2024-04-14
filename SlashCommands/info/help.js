const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const { glob } = require('glob');
const { promisify } = require('util');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Feeling lost?'),
    async execute(interaction) {
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
                            emoji: '<:info:1220474955687399504>',
                        },
                        {
                            label: 'Owner',
                            description: 'To view the owner commands',
                            value: 'owner',
                            emoji: '<:owner:1220474945633652826>',
                        },
                        {
                            label: 'Admin',
                            description: 'To view the admin commands',
                            value: 'admin',
                            emoji: '<:employee:1220475795412090891>',
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
            .setThumbnail('https://cdn.discordapp.com/attachments/1223568250810404925/1223568278719561769/noFilter.png?ex=661a53c2&is=6607dec2&hm=85090d587e60078ca67e9b5750ea35688773b494e4fa9de2e317dd52f6dc4181&')
            .setImage('https://cdn.discordapp.com/attachments/1218607459925753969/1229064062051291297/discordstatus_4.png?ex=662e521b&is=661bdd1b&hm=72f4b2365b4f0330643d98517e1f30e9cc85a7c068e1c73848fd740736f60a8c&')
            .setFooter('This bot isn\'t made by the official roblox Aesthetical. This bot was made for educational purposes only.')
            .setColor(interaction.guild.me.displayHexColor)
            .setTimestamp();

        interaction.reply({ embeds: [embed], components: [menu, buttonRow] }).then(msg => {
            const filter = b => b.user.id === interaction.user.id && b.customId === `help_${interaction.user.id}`;
            const collector = msg.createMessageComponentCollector({ filter: filter, componentType: 'SELECT_MENU', time: 120000 });

            collector.on('collect', b => {
                let embed_1 = new MessageEmbed()
                    .setColor(interaction.guild.me.displayHexColor)
                    .setTimestamp();

                if (b.values[0] === 'admin') {
                    adminFiles.map(value => {
                        const file = require(value);
                        const splitted = value.split('/');
                        const directory = splitted[splitted.length - 2];

                        if (file.name) {
                            const properties = { directory, ...file };
                            embed_1.addField(`${interaction.client.config.prefix}${properties.name}`, `${properties.description}`, true);
                        }
                    });
                } else if (b.values[0] === 'info') {
                    infoFiles.map(value => {
                        const file = require(value);
                        const splitted = value.split('/');
                        const directory = splitted[splitted.length - 2];

                        if (file.name) {
                            const properties = { directory, ...file };
                            embed_1.addField(`${interaction.client.config.prefix}${properties.name}`, `${properties.description}`, true);
                        }
                    });
                } else if (b.values[0] === 'owner') {
                    ownerFiles.map(value => {
                        const file = require(value);
                        const splitted = value.split('/');
                        const directory = splitted[splitted.length - 2];

                        if (file.name) {
                            const properties = { directory, ...file };
                            embed_1.addField(`${interaction.client.config.prefix}${properties.name}`, `${properties.description}`, true);
                        }
                    });
                }

                b.update({ embeds: [embed_1], components: [menu, buttonRow] }).catch(err => {});
            });
        });
    },
};
