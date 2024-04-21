const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "help",
    description: "Displays general information about the bot.",
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
            .setTitle("Mytho Help")
            .setDescription("Mytho, the Discord safeguard bot, is operated by Reduce and created by `ogqvnrvx`. For a comprehensive list of commands, please refer to our [documentation](https://qvnsecret.github.io/mytho/).")
            .setColor("#2b2d31")
            .setFooter("Mytho™ - 2024/2025")
            .setTimestamp();

        message.channel.send({ embeds: [embed] });
    },
};
