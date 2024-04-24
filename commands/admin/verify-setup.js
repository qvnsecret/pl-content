// commands/verify-setup.js
const fs = require('fs');
const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

module.exports = {
    name: "verify-setup",
    description: "Sets up verification channel and role.",
    run: async (client, message, args) => {
        if (!message.member.permissions.has("MANAGE_GUILD")) return message.reply("You do not have permission to do that!");

        const channel = message.mentions.channels.first();
        const role = message.mentions.roles.first();

        if (!channel || !role) return message.reply("You need to mention a channel and a role!");

        // Save configuration to a JSON file or a database
        const config = {
            channelId: channel.id,
            roleId: role.id
        };
        fs.writeFileSync(`./verifyConfig-${message.guild.id}.json`, JSON.stringify(config));

        message.channel.send(`Verification setup is complete. Channel set to ${channel} and role set to ${role}.`);
    }
};
