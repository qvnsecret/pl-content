const { MessageButton, MessageActionRow, MessageEmbed, MessageSelectMenu } = require("discord.js");
const { promisify } = require("util");
const glob = promisify(require("glob"));

module.exports = {
    name: "help",
    description: 'Feeling lost?',
    aliases: [],
    run: async (client, message, args) => {
        try {
            const adminFiles = await glob(`${process.cwd()}/commands/admin/**/*.js`);
            const infoFiles = await glob(`${process.cwd()}/commands/info/**/*.js`);
            const ownerFiles = await glob(`${process.cwd()}/commands/owner/**/*.js`);

            const menu = new MessageSelectMenu()
                .setCustomId(`help_${message.author.id}`)
                .setPlaceholder("Choose a category")
                .addOptions([
                    { label: 'Info', description: 'To view the info commands', value: 'info', emoji: '<:info:1220474955687399504>' },
                    { label: 'Owner', description: 'To view the owner commands', value: 'owner', emoji: '<:owner:1220474945633652826>' },
                    { label: 'Admin', description: 'To view the admin commands', value: 'admin', emoji: '<:employee:1220475795412090891>' }
                ]);

            const row = new MessageActionRow().addComponents(menu);

            const buttonRow = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setStyle('LINK')
                        .setLabel('Bug Server')
                        .setURL('https://discord.gg/n2DR6VJtgP')
                )
                .addComponents(
                    new MessageButton()
                        .setStyle('LINK')
                        .setLabel('Server Support')
                        .setURL('https://discord.com/invite/886Z9JUdXY')
                );

            const embed = new MessageEmbed()
                .setTitle('**Aesthetical**')
                .setDescription('**If you have any questions, contact *ogqvnrvx* or join our Bug Server!**')
                .setThumbnail('https://cdn.discordapp.com/attachments/1223568250810404925/1223568278719561769/noFilter.png?ex=661a53c2&is=6607dec2&hm=85090d587e60078ca67e9b5750ea35688773b494e4fa9de2e317dd52f6dc4181&')
                .setFooter('This bot isn\'t made by the official roblox Aesthetical. This bot was made for educational purposes only.')
                .setColor(message.guild.me.displayHexColor)
                .setTimestamp();

            const reply = await message.reply({ embeds: [embed], components: [row, buttonRow] });

            const filter = (interaction) => interaction.isSelectMenu() && interaction.customId === `help_${message.author.id}`;
            const collector = reply.createMessageComponentCollector({ filter, time: 120000 });

            collector.on('collect', async interaction => {
                const value = interaction.values[0];
                let files, categoryName;

                if (value === 'admin') {
                    files = adminFiles;
                    categoryName = 'Admin';
                } else if (value === 'info') {
                    files = infoFiles;
                    categoryName = 'Info';
                } else if (value === 'owner') {
                    files = ownerFiles;
                    categoryName = 'Owner';
                }

                const categoryEmbed = new MessageEmbed()
                    .setColor(message.guild.me.displayHexColor)
                    .setTimestamp()
                    .setTitle(`${categoryName} Commands`);

                for (const file of files) {
                    const command = require(file);
                    categoryEmbed.addField(`${client.config.prefix}${command.name}`, `${command.description}`, true);
                }

                await interaction.update({ embeds: [categoryEmbed], components: [row, buttonRow] }).catch(console.error);
            });

            collector.on('end', () => {
                reply.edit({ components: [] }).catch(console.error);
            });
        } catch (error) {
            console.error('Error in help command:', error);
            message.reply('There was an error while processing the command. Please try again later.');
        }
    },
};
