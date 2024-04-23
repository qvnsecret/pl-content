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
                    .setDescription("Here's the detailed [Terms of Use](https://qvnsecret.github.io/mytho/)")
                    .setColor("#2b2d31");
                await i.reply({ embeds: [tosEmbed], ephemeral: true });
} else if (i.customId === 'all_commands') {
    // Group commands by category
    const categories = {};
    client.commands.forEach(command => {
        const category = command.category || 'General'; // Default to 'General' if no category specified
        if (!categories[category]) {
            categories[category] = [];
        }
        categories[category].push(`\`${command.name}\` - ${command.description}`);
    });

    // Create embeds for each category to handle large command lists
    const embeds = [];
    Object.keys(categories).forEach(category => {
        const commandsEmbed = new MessageEmbed()
            .setTitle(`${category} Commands`)
            .setDescription(categories[category].join('\n'))
            .setColor("#2b2d31");

        // Ensure the embed is not too large
        if (commandsEmbed.length > 6000) { // Discord's max embed size is 6000 characters
            const splitDescriptions = splitEmbedDescription(categories[category]);
            splitDescriptions.forEach(desc => {
                embeds.push(new MessageEmbed().setTitle(`${category} Commands (cont.)`).setDescription(desc).setColor("#2b2d31"));
            });
        } else {
            embeds.push(commandsEmbed);
        }
    });

    // Respond with the first embed and add reaction controls if multiple embeds are created
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

function splitEmbedDescription(descriptions) {
    // This function splits a long array of command descriptions into chunks for multiple embeds
    const maxChars = 2048; // Max description length for an embed
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
);

        collector.on('end', collected => console.log(`Collected ${collected.size} items`));
    },
};
