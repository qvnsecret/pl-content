const { MessageEmbed } = require("discord.js");
const db = require('quick.db');

module.exports = {
    name: "warn",
    description: "Gives a warning to a user.",
    run: async (client, message, args) => {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const reason_msg = args.slice(1).join(' ');

        if (!message.member.permissions.has("MANAGE_MESSAGES")) {
            return message.reply({
                embeds: [{
                    description: "You don't have permission to use this command",
                    color: "#2b2d31"
                }],
                ephemeral: true
            }).catch(console.error);
        }

        if (!args[0] || !member) {
            return message.reply({
                embeds: [{
                    description: "Please mention a member or provide their ID.",
                    color: "#2b2d31"
                }],
                ephemeral: true
            }).catch(console.error);
        }

        if (member.id === message.author.id) {
            return message.reply({
                embeds: [{
                    description: "You can't warn yourself.",
                    color: "#2b2d31"
                }],
                ephemeral: true
            }).catch(console.error);
        }

        if (message.member.roles.highest.position <= member.roles.highest.position) {
            return message.reply({
                embeds: [{
                    description: "You can't warn someone with an equal or higher role.",
                    color: "#2b2d31"
                }],
                ephemeral: true
            }).catch(console.error);
        }

        if (!reason_msg) {
            return message.reply({
                embeds: [{
                    description: "Please provide a reason for the warning.",
                    color: "#2b2d31"
                }],
                ephemeral: true
            }).catch(console.error);
        }

        // Increment warnings count
        db.add(`warns_${member.id}`, 1);
        let Warn = db.get(`warns_${member.id}`);
        console.log(Warn); // Consider removing this or changing to a more detailed log if necessary

        const embed = new MessageEmbed()
            .setTitle('You were warned!')
            .setDescription(`**Reason:** ${reason_msg}`)
            .setColor('#2b2d31')
            .setTimestamp()
            .setFooter(`${message.guild.name}`, message.guild.iconURL());

        message.reply({
            content: `**${member.user.username} has been warned! Total warnings: ${Warn}**`,
            embeds: [embed],
            ephemeral: true
        });
        
        // Send a DM to the member with the warning information
        member.send({ embeds: [embed] }).catch(err => {
            console.error(`Could not send DM to ${member.user.tag}: ${err.message}`);
            message.channel.send(`Failed to send a DM to ${member.user.username}.`).catch(console.error);
        });
    },
};
