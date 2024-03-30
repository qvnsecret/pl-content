const { Message, Client } = require("discord.js");

module.exports = {
        name: "unmute",
        description: `unmute a member.`,
        run: async (client, message, args) => {
                const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

                const permission = message.member.permissions.has("MANAGE_ROLES");
                const guilds = message.guild.me.permissions.has("MANAGE_ROLES");
                if (!permission) return message.reply({ content: ":x: **You don't have permission to use this command**" }).catch((err) => {
                        console.log(`i couldn't reply to the message: ` + err.message)
                })

                if (!args[0]) return message.reply({ content: `:rolling_eyes: **Please mention member or id**` }).catch((err) => {
                        console.log(`i couldn't reply to the message: ` + err.message)
                })

                if (!member) return message.reply({ content: `:rolling_eyes: **I can't find this member**` }).catch((err) => {
                        console.log(`i couldn't reply to the message: ` + err.message)
                })

                if (member.id === message.member.id) return message.reply({ content: `:rolling_eyes: **You can't use this on your self**` }).catch((err) => {
                        console.log(`i couldn't reply to the message: ` + err.message)
                })

               if (message.member.roles.highest.position < member.roles.highest.position) return message.reply({ content: `:rolling_eyes: **You can't unmuted ${member.user.username} have higher role than you**` }).catch((err) => {
                        console.log(`i couldn't reply to the message: ` + err.message)
                })

                if (!guilds) return message.reply({ content: `:rolling_eyes: **I couldn't unmute that user. Please check my permissions and role position.**` }).catch((err) => {
                        console.log(`i couldn't reply to the message: ` + err.message)
                })

                let muteRole = message.guild.roles.cache.find((role) => role.name == "Mute");
                if (!member.roles.cache.some((role) => role.name == "Mute")) {
                        message.reply({ content: `:rolling_eyes: **${member.user.username} is not muted.**` }).catch((err) => {
                                console.log(`i couldn't reply to the message: ` + err.message)
                        })
                } else {
                        member.roles.remove(muteRole);
                        message.reply({ content: `:white_check_mark: **${member.user.username} unmuted from the text!**` }).catch((err) => {
                                console.log(`i couldn't reply to the message: ` + err.message)
                        })
                }
        },
};