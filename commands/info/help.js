const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

module.exports = {
    name: "help",
    description: "Displays general information about the bot.",
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
            .setTitle("Mytho Help")
            .setDescription("💼 Mytho, the Discord safeguard bot, is operated by Reduce and created by `ogqvnrvx`. For a comprehensive list of commands, please refer to our [documentation](https://qvnsecret.github.io/mytho/).")
            .setColor("#FF3A3A")
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
            } else if (i.customId === 'tos') {
                const tosEmbed = new MessageEmbed()
                    .setTitle("Terms of Use")
                    .setDescription("Here's the detailed [Terms of Use](https://qvnsecret.github.io/mytho/)")
                    .setColor("#2b2d31");
                await i.reply({ embeds: [tosEmbed], ephemeral: true });
            } else if (i.customId === 'all_commands') {
                const categories = {};
                client.commands.forEach(command => {
                    const category = command.category || 'General';
                    if (!categories[category]) {
                        categories[category] = [];
                    }
                    categories[category].push(`\`${command.name}\` - ${command.description}`);
                });

                const embeds = [];
                Object.keys(categories).forEach(category => {
                    const commandsEmbed = new MessageEmbed()
                        .setTitle(`${category} Commands`)
                        .setDescription(categories[category].join('\n'))
                        .setColor("#2b2d31");

                    if (commandsEmbed.length > 6000) {
                        const splitDescriptions = splitEmbedDescription(categories[category]);
                        splitDescriptions.forEach(desc => {
                            embeds.push(new MessageEmbed().setTitle(`${category} Commands (cont.)`).setDescription(desc).setColor("#2b2d31"));
                        });
                    } else {
                        embeds.push(commandsEmbed);
                    }
                });

                let currentPage = 0;
                const botMessage = await i.reply({ embeds: [embeds[currentPage]], ephemeral: true, fetchReply: true });

                if (embeds.length > 1) {
                    await botMessage.react('◀️');
                    await botMessage.react('▶️');

                    const filter = (reaction, user) => ['◀️', '▶️'].includes(reaction.emoji.name) && user.id === i.user.id;
                    const collector = botMessage.createReactionCollector({ filter, time: 60000 });

                    collector.on('collect', reaction => {
                        reaction.users.remove(i.user);
                        if (reaction.emoji.name === '▶️') {
                            if (currentPage < embeds.length - 1) currentPage++;
                        } else if (reaction.emoji.name === '◀️') {
                            if (currentPage > 0) currentPage--;
                        }

                        botMessage.edit({ embeds: [embeds[currentPage]] });
                    });

                    collector.on('end', () => {
                        botMessage.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
                    });
                }
            }
        });

        collector.on('end', collected => console.log(`Collected ${collected.size} items`));
    }
};

function splitEmbedDescription(descriptions) {
    const maxChars = 2048;
    let currentChunk = '';
    const output = [];

    descriptions.forEach(desc => {
        if (currentChunk.length + desc.length > maxChars) {
            output.push(currentChunk);
            currentChunk = desc;
        } else {
            currentChunk += `\n${desc}`;
        }
    });

    if (currentChunk.length > 0) {
        output.push(currentChunk);
    }

    return output;
}
