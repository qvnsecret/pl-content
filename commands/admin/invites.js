const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "invites",
    description: "Checks how many invites a user has created and their status.",
    run: async (client, message, args) => {
        // Check if the member has the required permission to view invites
        if (!message.member.permissions.has("MANAGE_GUILD")) {
            return message.reply({
                embeds: [new MessageEmbed()
                    .setColor("#2b2d31")
                    .setDescription("You do not have permission to view invite data.")]
            });
        }

        // Ensure the bot has permission to manage invites
        if (!message.guild.me.permissions.has("MANAGE_GUILD")) {
            return message.reply({
                embeds: [new MessageEmbed()
                    .setColor("#2b2d31")
                    .setDescription("I do not have permission to view invites.")]
            });
        }

        // Fetching the user mentioned
        const user = message.mentions.users.first() || client.users.cache.get(args[0]);
        if (!user) {
            return message.reply({
                embeds: [new MessageEmbed()
                    .setColor("#2b2d31")
                    .setDescription("Please mention a user or provide their ID.")]
            });
        }

        // Fetch all guild invites
        const invites = await message.guild.invites.fetch();
        const userInvites = invites.filter(inv => inv.inviter.id === user.id);

        // Calculate invite statistics
        let joined = 0;
        let left = 0;
        let fake = 0;

        userInvites.forEach(invite => {
            joined += invite.uses;
            // Suppose an invite is considered 'fake' if it has 0 uses
            if (invite.uses === 0) {
                fake += 1;
            }
            // You can implement additional logic to track left members if needed
        });

        // Embed response for invite information
        message.reply({
            embeds: [new MessageEmbed()
                .setTitle(`Invites by ${user.tag}`)
                .setColor("#2b2d31")
                .addField('Total Invites', String(userInvites.size), true)
                .addField('Joined', String(joined), true)
                .addField('Fake', String(fake), true)
                .setDescription("Here are the invite stats for the user you specified.")]
        });
    },
};
