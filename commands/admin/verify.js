// commands/verify.js
const fs = require('fs');
const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

module.exports = {
    name: "verify",
    description: "Sends a verification message.",
    run: async (client, message, args) => {
        if (!message.member.permissions.has("MANAGE_GUILD")) return message.reply("You do not have permission to do that!");

        const config = JSON.parse(fs.readFileSync(`./verifyConfig-${message.guild.id}.json`, 'utf8'));
        const channel = client.channels.cache.get(config.channelId);
        if (!channel) return message.reply("The configured channel does not exist!");

        const embed = new MessageEmbed()
            .setColor("#2b2d31")
            .setTitle("Verification")
            .setDescription("React with ✅ to verify your account.");

        const verifyMessage = await channel.send({ embeds: [embed] });
        verifyMessage.react("✅");

        // Save the message ID for reaction handling
        config.messageId = verifyMessage.id;
        fs.writeFileSync(`./verifyConfig-${message.guild.id}.json`, JSON.stringify(config));
    }
};
