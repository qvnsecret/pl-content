const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "inviteleaderboard",
    description: "Display the invite leaderboard for the server.",
    aliases: ["invitelb"],
    run: async (client, message, args) => {
        const invites = await message.guild.fetchInvites();

        if (invites.size === 0) {
            return message.channel.send("There are no invites available for this server.");
        }

        const sortedInvites = invites.sort((a, b) => b.uses - a.uses).array();

        const embed = new MessageEmbed()
            .setTitle("Invite Leaderboard")
            .setDescription("Top 10 Invite Leaders")
            .setColor("#2b2d31")
            .setTimestamp();

        for (let i = 0; i < Math.min(sortedInvites.length, 10); i++) {
            const invite = sortedInvites[i];
            const member = message.guild.members.cache.get(invite.inviter.id);
            if (member) {
                embed.addField(`${i + 1}. ${member.user.tag}`, `Invites: ${invite.uses}`);
            }
        }

        message.channel.send({ embeds: [embed] });
    },
};
