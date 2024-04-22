const { CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: "invite",
    description: "Invite & Support our bot. You will help us a lot.",
    type: "CHAT_INPUT" // Type is not needed as 'CHAT_INPUT' is the default type for slash commands

    /**
     * This function runs when the slash command is executed.
     * @param {Client} client - The Discord client.
     * @param {CommandInteraction} interaction - The interaction object.
     */
    run: async (client, interaction) => {
        const button = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setStyle('LINK')
                    .setLabel('Invite the Bot')
                    .setURL('https://discord.com/oauth2/authorize?client_id=1223343717184835754')
            );

        // To correctly display the number of guilds, you must fetch this from the client object
        const guildCount = client.guilds.cache.size;

        const embed = new MessageEmbed()
            .setTitle('Support & Invite')
            .setDescription(`If you really wanna support us and [invite](https://discord.com/oauth2/authorize?client_id=1223343717184835754) our bot to reach our goal, we appreciate it a lot.\nWe are currently at \`${guildCount}\` guilds!`)
            .setColor('#2b2d31')
            .setTimestamp();

        // Reply to the interaction with the embed and button
        await interaction.reply({ embeds: [embed], components: [button] });
    },
};
