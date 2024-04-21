const { MessageEmbed } = require("discord.js");
const ms = require("ms");
const db = require('quick.db');

module.exports = {
    name: "mute",
    description: "Mute a member from text channels so they cannot type.",
    run: async (client, message, args) => {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        var time = args[1] ? ms(args[1]) : ms('24h');

        const permission = message.member.permissions.has("MANAGE_ROLES");
        const botPermission = message.guild.me.permissions.has("MANAGE_ROLES");

        if (!permission) {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription("**You don't have permission to use this command**");
            return message.reply({ embeds: [embed] }).catch(err => console.log(err.message));
        }

        if (!args[0] || !member) {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription("**Please mention a member or provide their ID**");
            return message.reply({ embeds: [embed] }).catch(err => console.log(err.message));
        }

        if (!botPermission) {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription("**I don't have the permissions to mute members. Please check my permissions and role position.**");
            return message.reply({ embeds: [embed] }).catch(err => console.log(err.message));
        }

        if (message.member.roles.highest.position <= member.roles.highest.position) {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription(`**You can't mute ${member.user.username} because they have a higher or equal role.**`);
            return message.reply({ embeds: [embed] }).catch(err => console.log(err.message));
        }

        let muteRole = message.guild.roles.cache.find(role => role.name === "Muted");
        if (!muteRole) {
            try {
                muteRole = await message.guild.roles.create({
                    data: {
                        name: "Muted",
                        permissions: []
                    }
                });
                message.guild.channels.cache.forEach(channel => {
                    channel.permissionOverwrites.edit(muteRole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    });
                });
            } catch (err) {
                console.log(err);
                return message.reply({ content: "**Failed to create the 'Muted' role. Please check my permissions.**" });
            }
        }

        try {
            await member.roles.add(muteRole);
            db.set(`MutedMember_${member.id}`, true);
            message.reply({ content: `**${member.user.username} has been muted for ${ms(time, { long: true })}.**` });

            setTimeout(async () => {
                await member.roles.remove(muteRole);
                db.set(`MutedMember_${member.id}`, false);
                message.channel.send(`**${member.user.username} is now unmuted!**`);
            }, time);
        } catch (err) {
            console.log(err);
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription(`**Failed to mute ${member.user.username}: ${err.message}**`);
            return message.reply({ embeds: [embed] });
        }
    },
};
