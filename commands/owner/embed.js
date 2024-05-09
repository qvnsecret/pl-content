const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "embed",
    description: "Creates a fully customizable embed based on user input.",
    run: async (client, message, args) => {
        if (!args.length) {
            return message.reply({ content: "Please provide parameters for the embed. Example: .embed title=Example, description=This is an embed, color=#2b2d31", ephemeral: true });
        }

        // Join the args array back into a string and split it into properties
        const input = args.join(" ");
        const properties = input.split(',').reduce((acc, prop) => {
            const [key, value] = prop.split('=').map(el => el.trim());
            if (key && value) {
                acc[key.toLowerCase()] = value;
            }
            return acc;
        }, {});

        const embed = new MessageEmbed();

        // Apply properties to the embed
        if (properties.title) {
            embed.setTitle(properties.title);
        }
        if (properties.description) {
            embed.setDescription(properties.description);
        }
        if (properties.color) {
            embed.setColor(properties.color);
        }
        if (properties.footer) {
            embed.setFooter(properties.footer);
        }
        if (properties.thumbnail) {
            embed.setThumbnail(properties.thumbnail);
        }
        if (properties.image) {
            embed.setImage(properties.image);
        }
        if (properties.url) {
            embed.setURL(properties.url);
        }

        // Send the customized embed
        message.channel.send({ embeds: [embed] }).catch(console.error);
    }
};
