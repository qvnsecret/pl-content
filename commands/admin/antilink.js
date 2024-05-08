const { MessageEmbed } = require("discord.js");
const db = require("./path/to/your/db"); // Path to your database file or module

module.exports = {
    name: "antilink",
    description: "Toggles the anti-link settings for the server.",
    run: async (client, message, args) => {
        if (!message.member.permissions.has("MANAGE_MESSAGES")) {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription("You don't have permission to configure anti-link settings.");
            return message.reply({ embeds: [embed] });
        }

        // Toggle the antilink setting
        const antilinkEnabled = db.get(`antilink_${message.guild.id}`) || false;
        db.set(`antilink_${message.guild.id}`, !antilinkEnabled);

        const embed = new MessageEmbed()
            .setColor("#2b2d31")
            .setDescription(`Anti-link is now **${!antilinkEnabled ? "enabled" : "disabled"}**.`);
        message.reply({ embeds: [embed] });
    }
};
