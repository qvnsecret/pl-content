const { Message, Client } = require("discord.js");

module.exports = {
        name: "setnick",
        description: `to change the member nickname.`,
        run: async (client, message, args) => {
                const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

                const permission = message.member.permissions.has("MANAGE_NICKNAMES");
                const guilds = message.guild.me.permissions.has("MANAGE_NICKNAMES");
                if (!permission) return message.reply({ content: ":x: **You don't have permission to use this command**" }).catch((err) => {
                        console.log(`i couldn't reply to the message: ` + err.message)
                })

                if (!args[0]) return message.reply({ content: `:rolling_eyes: **Please mention member or id**` }).catch((err) => {
                        console.log(`i couldn't reply to the message: ` + err.message)
                })

                if (!member) return message.reply({ content: `:rolling_eyes: **I can't find this member**` }).catch((err) => {
                        console.log(`i couldn't reply to the message: ` + err.message)
                })
                if (message.member.roles.highest.position < member.roles.highest.position) return message.reply({ content: `:rolling_eyes: **${member.user.username} have higher role than you**` })
          if (!guilds) return message.reply({ content: `:rolling_eyes: **I couldn't timeout that user. Please check my permissions and role position.**` }).catch((err) => {
                        console.log(`i couldn't reply to the message: ` + err.message)
                })
let name = args.slice(1).join(' ')
          if(!name){
            member.setNickname(` `).then(() => {
              message.reply(`:white_check_mark: **${member.user.username}** nickname has been reset`)
            })
          }else{
            member.setNickname(`${name}`).then(() => {
              message.reply(`:white_check_mark: **${member.user.username}** nickname has been changed to **${name}**`)
            }).catch((err) => {
          console.log(`i couldn't reply to the message: ` + err.message)
                })
          }
        },
};