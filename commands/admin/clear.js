const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "clear",
    description: "Cleans messages from a channel.",
    run: async (client, message, args) => {
        const permission = message.member.permissions.has("MANAGE_MESSAGES");
        const botPermission = message.guild.me.permissions.has("MANAGE_MESSAGES");

        // Check user's permission to manage messages
        if (!permission) {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription("**You don't have permission to use this command**");
            return message.reply({ embeds: [embed], ephemeral: true }).catch(err => console.log(err.message));
        }

        // Check bot's permission to manage messages
        if (!botPermission) {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription("**I don't have the permissions to manage messages!**");
            return message.reply({ embeds: [embed], ephemeral: true }).catch(err => console.log(err.message));
        }

        // Parse argument to get number of messages to delete
        let amount = args[0] ? parseInt(args[0]) : 100;
        if (isNaN(amount)) {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription("**Please provide a valid number**");
            return message.reply({ embeds: [embed] }).catch(err => console.log(err.message));
        }

        // Check if the amount exceeds the limit
        if (amount > 100) {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription("**You can't delete more than __100__ messages**");
            return message.reply({ embeds: [embed] }).catch(err => console.log(err.message));
        }

        // Check if the amount is less than 2
        if (amount < 2) {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription("**You need to delete at least __2__ messages**");
            return message.reply({ embeds: [embed] }).catch(err => console.log(err.message));
        }

        // Fetch and delete messages
        let messages;
        try {
            messages = await message.channel.messages.fetch({ limit: amount });
            messages = messages.filter(m => Date.now() - m.createdTimestamp <= 14 * 24 * 60 * 60000);
            await message.channel.bulkDelete(messages);
        } catch (error) {
            console.error("Failed to fetch/delete messages:", error);
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription("**Failed to clear messages.**");
            return message.reply({ embeds: [embed] }).catch(err => console.log(err.message));
        }

        // Send confirmation message
        const embed = new MessageEmbed()
            .setColor("#2b2d31")
            .setDescription(`${messages.size} messages have been deleted.`);
        message.channel.send({ embeds: [embed] }).then(replyMessage => {
            setTimeout(() => replyMessage.delete(), 6000);
        }).catch(err => console.log(err.message));
    },
};
