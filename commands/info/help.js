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
                    .setCustomId('tos')
                    .setLabel('Terms of Use')
                    .setStyle('SECONDARY'),
                new MessageButton()
                    .setCustomId('all_commands')
                    .setLabel('All Commands')
                    .setStyle('PRIMARY')
            );

        const sentMessage = await message.channel.send({ embeds: [embed], components: [buttons] });

        const filter = i => i.user.id === message.author.id;
        const collector = sentMessage.createMessageComponentCollector({ filter, time: 60000 });

        collector.on('collect', async i => {
            if (i.customId === 'privacy') {
                const privacyEmbed = new MessageEmbed()
                    .setTitle("Privacy Policy")
                    .setDescription("Here's the detailed [Privacy Policy](https://qvnsecret.github.io/mytho/)")
                    .setColor("#2b2d31");
                await i.reply({ embeds: [privacyEmbed], ephemeral: true });
            } else if (i.customId === 'tos') {
                const tosEmbed = new MessageEmbed()
                    .setTitle("Terms of Use")
                    .setDescription("Here's the detailed [Terms of Use](https://qvnsecret.github.io/mytho/)")
                    .setColor("#2b2d31");
                await i.reply({ embeds: [tosEmbed], ephemeral: true });
            } else if (i.customId === 'all_commands') {
                const categories = { 'Info': [], 'Admin': [], 'Owner': [] };
                client.commands.forEach(command => {
                    if (command.category && categories.hasOwnProperty(command.category)) {
                        categories[command.category].push(`\`${command.name}\` - ${command.description}`);
                    }
                });

                const embeds = [];
                for (const category in categories) {
                    if (categories[category].length > 0) {
                        const commandsEmbed = new MessageEmbed()
                            .setTitle(`${category} Commands`)
                            .setDescription(categories[category].join('\n'))
                            .setColor("#2b2d31");

                        embeds.push(commandsEmbed);
                    }
                }

                let currentPage = 0;
                const botMessage = await i.reply({ embeds: [embeds[currentPage]], ephemeral: true, fetchReply: true });

                if (embeds.length > 1) {
                    await botMessage.react('◀️');
                    await botMessage.react('▶️');

                    const reactionFilter = (reaction, user) => ['◀️', '▶️'].includes(reaction.emoji.name) && user.id === i.user.id;
                    const reactionCollector = botMessage.createReactionCollector({ filter: reactionFilter, time: 60000 });

                    reactionCollector.on('collect', (reaction, user) => {
                        reaction.users.remove(user.id);
                        if (reaction.emoji.name === '▶️' && currentPage < embeds.length - 1) {
                            currentPage++;
                        } else if (reaction.emoji.name === '◀️' && currentPage > 0) {
                            currentPage--;
                        }
                        botMessage.edit({ embeds: [embeds[currentPage]] });
                    });

                    reactionCollector.on('end', () => {
                        botMessage.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
                    });
                }
            }
        });

        collector.on('end', collected => console.log(`Collected ${collected.size} items`));
    }
};
