const { MessageButton, MessageActionRow, MessageEmbed } = require("discord.js");
const { glob } = require("glob");
const { promisify } = require("util");

module.exports = {
    name: "help",
    description: 'Feeling lost?',
    aliases: [],
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
            .setTitle("**Mytho**")
            .setDescription(`**Thank you for choosing our bot, <:mytho:1230996358081544222> \`Mytho\`. Below, you'll find a comprehensive list of all available commands for your convenience.**\nBot Prefix: ${client.config.prefix}help`)
            .setColor("#2b2d31")
            .setTimestamp()
            .setFooter("This bot isn't made by the official roblox Aesthetical. This bot was made for educational purposes only.");

        try {
            const globPromise = promisify(glob);
            const commandFiles = {
                admin: await globPromise(`${process.cwd()}/commands/admin/**/*.js`),
                info: await globPromise(`${process.cwd()}/commands/info/**/*.js`),
                owner: await globPromise(`${process.cwd()}/commands/owner/**/*.js`),
            };

            for (const category in commandFiles) {
                const commands = [];
                commandFiles[category].forEach(value => {
                    const file = require(value);
                    if (file.name && file.description) {
                        commands.push(`**${client.config.prefix}${file.name}**: ${file.description}`);
                    }
                });
                if (commands.length > 0) {
                    embed.addField(`#${category.charAt(0).toUpperCase() + category.slice(1)}`, commands.join("\n"));
                }
            }
        } catch (error) {
            console.error(error);
            embed.addField("Error", "An error occurred while fetching commands.");
        }

        message.channel.send({ embeds: [embed] });
    },
};
