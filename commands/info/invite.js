const { MessageButton, MessageActionRow, MessageEmbed } = require("discord.js");

module.exports = {
    name: "invite",
    description: 'Invite & Support our bot. You will help us a lot.',
    aliases: [],
    run: async (client, message, args) => {
        let button = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setStyle('LINK')
                    .setLabel('Invite the Bot')
                    .setURL('https://discord.com/oauth2/authorize?client_id=1223343717184835754')
            );

        // To correctly display the number of guilds, you must fetch this from the client object
        let guildCount = client.guilds.cache.size;

        let embed = new MessageEmbed()
            .setTitle('Support & Invite')
            .setDescription(`💧 | If you really wanna support us and [invite](https://discord.com/oauth2/authorize?client_id=1223343717184835754) our bot to reach our goal, we appreciate it a lot.\nWe are currently at \`${guildCount}\` guilds!`)
            .setColor('#FF3A3A')
            .setTimestamp();

        message.reply({ embeds: [embed], components: [button] });
    },
};
