const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "embed",
    description: "Send a customizable embed message based on input parameters.",
    run: async (client, message, args) => {
        // Join all arguments and split by ', ' to separate each field
        const input = args.join(' ').split(', ').reduce((acc, curr) => {
            const [key, value] = curr.split('=');
            if (key && value) acc[key.trim()] = value.trim();
            return acc;
        }, {});

        // Create a new embed and set properties based on input
        const embed = new MessageEmbed().setColor(input.color || "#2b2d31");

        if (input.title) embed.setTitle(input.title);
        if (input.description) embed.setDescription(input.description);
        if (input.footer) embed.setFooter(input.footer);
        if (input.image) embed.setImage(input.image);
        if (input.thumbnail) embed.setThumbnail(input.thumbnail);
        if (input.url) embed.setURL(input.url);
        if (input.author) embed.setAuthor(input.author);

        // Send the embed to the channel
        message.channel.send({ embeds: [embed] }).catch(console.error);
    },
};
