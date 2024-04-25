const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "invites",
    description: "Checks how many invites a user has created, including details on joins, leaves, and potential alts.",
    run: async (client, message, args) => {
        // If no user is mentioned or no ID is provided, default to the author of the message
        const user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;

        // Fetch all guild invites
        const invites = await message.guild.invites.fetch();
        const userInvites = invites.filter(inv => inv.inviter.id === user.id);

        // Prepare to collect detailed stats
        let totalInvites = 0;
        let joined = 0;
        let left = 0;
        let alts = 0;

        userInvites.forEach(invite => {
            totalInvites += invite.uses;
            joined += invite.uses;

            // Assuming guildMember tracking is available through a database or cache:
            // Check for alts, assuming you have a way to fetch a member object
            if (invite.guild.members.cache.get(invite.inviter.id)) {
                const creationTimeThreshold = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
                let member = invite.guild.members.cache.get(invite.inviter.id);
                if (Date.now() - member.user.createdAt < creationTimeThreshold) {
                    alts++;
                }
            }
        });

        // You need real data for joins and leaves from your database or tracking system
        left = joined; // Placeholder, actual data needed

        // Send an embed with the invite data
        const embed = new MessageEmbed()
            .setTitle(`Invites by ${user.tag}`)
            .setColor("#2b2d31")
            .addField('Total Invites', String(totalInvites), true)
            .addField('Joined', String(joined), true)
            .addField('Left', String(left), true)
            .addField('Alts', String(alts), true)
            .setDescription("Detailed stats for the invites sent by the specified user.")
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL());

        message.channel.send({ embeds: [embed] });
    },
};
