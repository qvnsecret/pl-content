const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "embed",
    description: "Send a customizable embed message.",
    run: async (client, message, args) => {
        try {
            // Function to prompt user for embed customization
            const promptEmbedEditor = async () => {
                // Create an embed with default settings
                const embed = new MessageEmbed()
                    .setTitle("Customize your Embed")
                    .setColor("#2b2d31")
                    .setDescription("React to customize your embed message.")
                    .setTimestamp();

                // Send the initial embed message and store the message object
                const embedEditorMessage = await message.author.send({ embeds: [embed] });

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
                    switch (reaction.emoji.name) {
                        case "⏹️":
                            // Stop editing and send the embed
                            await sendEmbedMessage(embedEditorMessage, embed);
                            collector.stop();
                            break;
                        case "✏️":
                            // Prompt user to edit the title
                            // Example: embed.setTitle("New Title");
                            break;
                        case "📝":
                            // Prompt user to edit the description
                            // Example: embed.setDescription("New Description");
                            break;
                        case "🎨":
                            // Prompt user to change the color
                            // Example: embed.setColor("#ff0000");
                            break;
                        case "🖼️":
                            // Prompt user to change the image
                            // Example: embed.setImage("image_url_here");
                            break;
                        // Add cases for other customization options...
                    }

                    // Update the embed message with the new changes
                    await embedEditorMessage.edit({ embeds: [embed] });
                });
            };

            // Function to send embed message
            const sendEmbedMessage = async (messageObject, embed) => {
                // Send the embed message to the channel
                await message.channel.send({ embeds: [embed] });

                // Delete the original command message and the embed editor message
                await message.delete();
                await messageObject.delete();
            };

            // Check if the user wants to customize the embed
            if (args.includes("--customize")) {
                await promptEmbedEditor();
            } else {
                // Create the embed based on provided arguments (if any)
                const embed = new MessageEmbed()
                    .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
                    .setColor("#2b2d31")
                    .setTimestamp();

                // Set embed content based on provided arguments
                if (args[0]) embed.setTitle(args[0]);
                if (args[1]) embed.setDescription(args.slice(1).join(" "));
                // Add more logic for other arguments such as color, image, etc.

                // Send the embed message directly to the user
                await sendEmbedMessage(null, embed);
            }
        } catch (error) {
            // Error handling
            console.error("Error occurred:", error.message);
            message.reply({ content: error.message })
                .catch(err => console.error("Error occurred while replying:", err.message));
        }
    },
};
