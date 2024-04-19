const { MessageButton, MessageActionRow, MessageEmbed, MessageSelectMenu } = require("discord.js");
const { glob } = require("glob");
const { promisify } = require("util");

module.exports = {
    name: "help",
    description: 'Feeling lost?',
    aliases: [],
    run: async (client, message, args) => {
        try {
            const { prefix } = client.config;

            const globPromise = promisify(glob);
            const commandFiles = {
                admin: await globPromise(`${process.cwd()}/commands/admin/**/*.js`),
                info: await globPromise(`${process.cwd()}/commands/info/**/*.js`),
                owner: await globPromise(`${process.cwd()}/commands/owner/**/*.js`),
            };

            const menuOptions = [
                { label: 'Info', description: 'To view the info commands', value: 'info', emoji: '<:info:1220474955687399504>' },
                { label: 'Owner', description: 'To view the owner commands', value: 'owner', emoji: '<:owner:1220474945633652826>' },
                { label: 'Admin', description: 'To view the admin commands', value: 'admin', emoji: '<:employee:1220475795412090891>' }
            ];

            const menu = new MessageSelectMenu()
                .setCustomId(`help_${message.author.id}`)
                .setPlaceholder("Choose a category")
                .addOptions(menuOptions);

            const row = new MessageActionRow().addComponents(menu);

            const buttonRow = new MessageActionRow()
                .addComponents(
                    new MessageButton().setStyle('LINK').setLabel('Bug Server').setURL(`https://discord.gg/n2DR6VJtgP`),
                    new MessageButton().setStyle('LINK').setLabel('Server Support').setURL(`https://discord.com/invite/886Z9JUdXY`)
                );

            const embed = new MessageEmbed()
                .setTitle('**Mytho**')
                .setDescription(`**Thank you for choosing our bot, <:mytho:1230996358081544222> \`Mytho\`. Below, youll find a comprehensive list of all available commands for your convenience.**\nBot Prefix: ${prefix}help`)
                .setThumbnail('https://cdn.discordapp.com/attachments/1223568250810404925/1223568278719561769/noFilter.png?ex=661a53c2&is=6607dec2&hm=85090d587e60078ca67e9b5750ea35688773b494e4fa9de2e317dd52f6dc4181&')
                .setImage('https://cdn.discordapp.com/attachments/1218607459925753969/1229064062051291297/discordstatus_4.png?ex=662e521b&is=661bdd1b&hm=72f4b2365b4f0330643d98517e1f30e9cc85a7c068e1c73848fd740736f60a8c&')
                .setFooter("This bot isn't made by the official roblox Aesthetical. This bot was made for educational purposes only.")
                .setColor('#2b2d31')
                .setTimestamp();

            const collectorFilter = (b) => b.user.id === message.author.id && b.customId === `help_${message.author.id}`;
            const collector = message.reply({ embeds: [embed], components: [row, buttonRow] }).then(msg => {
                const componentCollector = msg.createMessageComponentCollector({ filter: collectorFilter, componentType: 'SELECT_MENU', time: 120000 });

                componentCollector.on("collect", async (b) => {
                    let embedUpdate = new MessageEmbed().setColor('#2b2d31').setTimestamp();

                    switch (b.values[0]) {
                        case "admin":
                        case "info":
                        case "owner":
                            const category = b.values[0];
                            commandFiles[category].map((value) => {
                                const file = require(value);
                                const splitted = value.split("/");
                                const directory = splitted[splitted.length - 2];
                                if (file.name) {
                                    const properties = { directory, ...file };
                                    embedUpdate.addField(`${prefix}${properties.name}`, `${properties.description}`, true);
                                }
                            });
                            break;
                    }
                    await b.update({ embeds: [embedUpdate], components: [row, buttonRow] }).catch(console.error);
                });
            });
        } catch (error) {
            console.error(error);
            message.reply("An error occurred while processing your request.");
        }
    },
};
