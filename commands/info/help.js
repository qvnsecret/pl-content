const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

module.exports = {
    name: "help",
    description: "Displays general information about the bot.",
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
            .setTitle("<:mytho:1230996358081544222> Mytho Help")
            .setDescription("Mytho, the Discord safeguard bot, is operated by Reduce and created by `ogqvnrvx`. For a comprehensive list of commands, please refer to our [documentation](https://qvnsecret.github.io/mytho/).")
            .setColor("#2b2d31")
            .setFooter("Mytho™ - 2024/2025")
            .setTimestamp();

        const buttons = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('privacy')
                    .setLabel('Privacy')
                    .setStyle('SECONDARY'),
                new MessageButton()
                    .setCustomId('tou')
                    .setLabel('Terms of Use')
                    .setStyle('SECONDARY'),
                new MessageButton()
                    .setCustomId('all_commands')
                    .setLabel('All Commands')
                    .setStyle('PRIMARY')
            );

        message.channel.send({ embeds: [embed], components: [buttons] });

        const filter = i => i.user.id === message.author.id;
        const collector = message.channel.createMessageComponentCollector({ filter, time: 15000 });

        collector.on('collect', async i => {
            if (i.customId === 'privacy') {
                const privacyEmbed = new MessageEmbed()
                    .setTitle("Privacy Policy")
                    .setDescription("Here's the detailed [Privacy Policy](https://qvnsecret.github.io/mytho/)")
                    .setColor("#2b2d31");
                await i.reply({ embeds: [privacyEmbed], ephemeral: true });
            } else if (i.customId === 'tou') {
                const tosEmbed = new MessageEmbed()
                    .setTitle("Terms of Use")
                    .setDescription("Here's the detailed Terms of Use")
                    .setColor("#2b2d31");
                await i.reply({ embeds: [tosEmbed], ephemeral: true });
            } else if (i.customId === 'all_commands') {
                const commandsEmbed = new MessageEmbed()
                    .setTitle("All Commands")
                    .setDescription("Overview of all commands available.")
                    .addField("Soon", "`Our team is working on it...`")
                    .setColor("#2b2d31");
                await i.reply({ embeds: [commandsEmbed], ephemeral: true });
            }
        });

        collector.on('end', collected => console.log(`Collected ${collected.size} items`));
    },
};
