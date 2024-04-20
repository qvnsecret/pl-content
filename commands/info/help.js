const { MessageButton, MessageActionRow, MessageEmbed } = require("discord.js");
const { glob } = require("glob");
const { promisify } = require("util");

module.exports = {
    name: "help",
    description: 'Feeling lost?',
    aliases: [],
    run: async (client, message, args) => {
        const globPromise = promisify(glob);
        
        // Load all command files
        const commandFiles = await Promise.all([
            globPromise(`${process.cwd()}/commands/admin/**/*.js`),
            globPromise(`${process.cwd()}/commands/info/**/*.js`),
            globPromise(`${process.cwd()}/commands/owner/**/*.js`)
        ]);

        let embed = new MessageEmbed()
            .setTitle("**Mytho**")
            .setDescription(`**Thank you for choosing our bot, <:mytho:1230996358081544222> \`Mytho\`. Below, you'll find a comprehensive list of all available commands for your convenience.**\nBot Prefix: ${client.config.prefix}help`)
            .setColor(`#2b2d31`)
            .setTimestamp()
            .setFooter(`Mytho, best bot ever`)

        // Categories are assumed to be in the order of admin, info, owner from Promise.all result
        const categories = ['Admin', 'Info', 'Owner'];
        commandFiles.forEach((files, index) => {
            let commandsList = files.map(file => {
                const command = require(file);
                return `**${client.config.prefix}${command.name}** - ${command.description}`;
            }).join('\n');

            if (commandsList) {
                embed.addField(categories[index] + ' Commands', commandsList);
            }
        });

        let button = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setStyle('LINK')
                    .setLabel('Bug Server')
                    .setURL(`https://discord.gg/n2DR6VJtgP`),
                new MessageButton()
                    .setStyle('LINK')
                    .setLabel('Server Support')
                    .setURL(`https://discord.com/invite/886Z9JUdXY`)
            );

        message.reply({ embeds: [embed], components: [button] });
    },
};
