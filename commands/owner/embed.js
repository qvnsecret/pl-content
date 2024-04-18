const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "embed",
    description: "Send a customizable embed message.",
    run: async (client, message, args) => {
        try {
            // Function to prompt user for embed customization
            const promptEmbedEditor = async () => {
                const embedEditorMessage = await message.author.send("Please provide the details for your embed message.");

                // Add reactions for customization options
                await embedEditorMessage.react("⏹️"); // Stop editing
                await embedEditorMessage.react("✏️"); // Edit title
                await embedEditorMessage.react("📝"); // Edit description
                await embedEditorMessage.react("🎨"); // Change color
                await embedEditorMessage.react("🖼️"); // Change image
                // Add more reactions for other customization options...

                // Listen for reactions and update the embed accordingly
                const collector = embedEditorMessage.createReactionCollector({ filter: (reaction, user) => user.id === message.author.id });
                collector.on("collect", async (reaction, user) => {
                    // Handle reaction input and update the embed accordingly
                    // Example: If reaction is "✏️", prompt user to edit the title
                });
            };

            // Function to send embed message
            const sendEmbedMessage = async (embed) => {
                // Send the embed message to the channel
                await message.channel.send({ embeds: [embed] });

                // Delete the original command message
                await message.delete();
            };

            // Initial embed setup
            const embed = new MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
                .setColor("#7289DA")
                .setTimestamp();

            // Check if the user wants to customize the embed
            if (args.includes("--customize")) {
                await promptEmbedEditor();
            } else {
                // Set embed content based on provided arguments
                if (args[0]) embed.setTitle(args[0]);
                if (args[1]) embed.setDescription(args.slice(1).join(" "));
                // Add more logic for other arguments such as color, image, etc.

                // Send the embed message directly to the user
                await sendEmbedMessage(embed);
            }
        } catch (error) {
            // Error handling
            console.error("Error occurred:", error.message);
            message.reply({ content: error.message })
                .catch(err => console.error("Error occurred while replying:", err.message));
        }
    },
};
