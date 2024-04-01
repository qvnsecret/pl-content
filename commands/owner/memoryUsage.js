// memoryUsage.js
const { MessageEmbed } = require("discord.js");
const os = require('os');

module.exports = {
    name: "memory",
    description: 'Get the bot\'s memory usage',
    run: async (client, message, args) => {
        const totalMemory = (os.totalmem() / 1024 / 1024).toFixed(2);
        const usedMemory = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);

        const embed = new MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
            .setTitle('Memory Usage')
            .setDescription(`Memory Usage: `/`/`/${usedMemory} MB / ${totalMemory} MB`/`/`/`)
            .setTimestamp();

        message.reply({ embeds: [embed] });
    },
};
