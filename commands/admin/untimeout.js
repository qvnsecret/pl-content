const { Message, Client } = require("discord.js");
const ms = require('ms')

module.exports = {
        name: "untimeout",
        description: `removes timeout a member.`,
        run: async (client, message, args) => {
                const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

                const permission = message.member.permissions.has("MODERATE_MEMBERS");
                const guilds = message.guild.me.permissions.has("MODERATE_MEMBERS");
                if (!permission) return message.reply({ content: ":x: **You don't have permission to use this command**" }).catch((err) => {
                        console.log(`i couldn't reply to the message: ` + err.message)
                })

                if (!args[0]) return message.reply({ content: `:rolling_eyes: **Please mention member or id**` }).catch((err) => {
                        console.log(`i couldn't reply to the message: ` + err.message)
                })

                if (!member) return message.reply({ content: `:rolling_eyes: **I can't find this member**` }).catch((err) => {
                        console.log(`i couldn't reply to the message: ` + err.message)
                })

                if (member.id === message.author.id) return message.reply({ content: `:rolling_eyes: **You can't use this on your self**` }).catch((err) => {
                        console.log(`i couldn't reply to the message: ` + err.message)
                })

                if (message.member.roles.highest.position < member.roles.highest.position) return message.reply({ content: `:rolling_eyes: **You can't timeout ${member.user.username} have higher role than you**` }).catch((err) => {
                        console.log(`i couldn't reply to the message: ` + err.message)
                })

                if (!guilds) return message.reply({ content: `:rolling_eyes: **I couldn't timeout that user. Please check my permissions and role position.**` }).catch((err) => {
                        console.log(`i couldn't reply to the message: ` + err.message)
                })
          member.timeout(ms('1s'),`done by: ${message.member.nickname} , ${message.author.id}`)
          .then(() => {
            message.reply({content: `:white_check_mark: **Done untimeout ${member.user.username}**`})
          }).catch((err) => {
                        console.log(err.message)
                })
        },
};