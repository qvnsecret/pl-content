const { MessageEmbed } = require("discord.js");
const fs = require("fs");
const path = require("path");

module.exports = {
    name: "help",
    description: "Displays all commands available.",
    run: async (client, message, args) => {
        const categories = ['info', 'admin', 'owner'];
        const commandsPath = path.join(__dirname, 'commands'); // Adjust this path to your commands directory structure

        let embed = new MessageEmbed()
            .setTitle("Available Commands")
            .setDescription("Here are all the commands grouped by category:")
            .setColor("#0099ff")
            .setFooter("Mytho 2024");

        categories.forEach(category => {
            const commandFiles = fs.readdirSync(path.join(commandsPath, category))
                .filter(file => file.endsWith('.js'));

            if (commandFiles.length === 0) return;

            const commands = commandFiles.map(file => {
                const command = require(path.join(commandsPath, category, file));
                return `\`${command.name}\` - ${command.description}`;
            }).join("\n");

            if (commands.length > 0) {
                embed.addField(`${category.charAt(0).toUpperCase() + category.slice(1)} Commands`, commands);
            }
        });

        message.channel.send({ embeds: [embed] });
    },
};
