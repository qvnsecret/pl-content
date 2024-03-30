const { Message, Client } = require("discord.js");

const ms = require("ms");
const db = require('quick.db')


module.exports = {
        name: "mute",
        description: `Mute a member from text channels so they cannot type.`,
        run: async (client, message, args) => {
                const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        var time = args[1]
        if (!time) time = '24h'

                const permission = message.member.permissions.has("MANAGE_ROLES");
                const guilds = message.guild.me.permissions.has("MANAGE_ROLES");

                if (!permission)
                        return message.reply(
                                { content: ":x: **You don't have permission to use this command**", ephemeral: true }
                        ).catch((err) => {
                                console.log(`i couldn't reply to the message: ` + err.message)
                        })
             

              if (!args[0]) return message.reply({ content: `:rolling_eyes: **Please mention member or id**`, ephemeral: true }).catch((err) => {
                        console.log(`i couldn't reply to the message: ` + err.message)
                })

                if (!member) return message.reply({ content: `:rolling_eyes: **I can't find this member**`, ephemeral: true }).catch((err) => {
                        console.log(`i couldn't reply to the message: ` + err.message)
                })         

                if (member.id === message.member.id)
                        return message.reply({ content: `:rolling_eyes: **You can't mute ${member.user.username}**`, ephemeral: true }).catch((err) => {
                                console.log(`i couldn't reply to the message: ` + err.message)
                        })

                if (message.member.roles.highest.position < member.roles.highest.position)
                        return message.reply({
                                content:
                                        `:rolling_eyes: **You can't mute ${member.user.username} have higher role than you**`
                                , ephemeral: true
                        }).catch((err) => {
                                console.log(`i couldn't reply to the message: ` + err.message)
                        })

                if (!guilds) return message.reply({ content: `:rolling_eyes: **I couldn't mute that user. Please check my permissions and role position.**`, ephemeral: true }).catch((err) => {
                        console.log(`i couldn't reply to the message: ` + err.message)
                })

                let muteRole = message.guild.roles.cache.find((role) => role.name == "Mute");
                if (!muteRole) {
                        message.guild.roles.create({
            name: "Mute",
                        }).then((createRole) => {
                                message.guild.channels.cache.filter((c) => c.type == "GUILD_TEXT").forEach(c => {
                                        c.permissionOverwrites.edit(createRole, {
                                                SEND_MESSAGES: false,
        ADD_REACTIONS: false                                 
                                        })
                                })
                                message.reply({ content: `:x: **Muted role is not created. please run the command again.**`, ephemeral: true }).catch((err) => {
                                        console.log(`i couldn't reply to the message: ` + err.message)
                                })
                        })
                } else {
                        message.guild.members.cache.get(member.id)?.roles.add(muteRole);
                        message.reply({ content: `:white_check_mark: **${member.user.username} muted from the text! :zipper_mouth:**`, ephemeral: true }).catch((err) => {
                                console.log(`i couldn't reply to the message: ` + err.message)
                  })
                          db.set(`MutedMember_${member.id}`, 'True')
                  
  setTimeout(async () => {
    await member.roles.remove(muteRole)
  db.set(`MutedMember_${member.id}`, 'False')  
      message.reply({ content: `:white_check_mark: **${member.user.username} Is now unmuted!**`, ephemeral: true }).catch((err) => {
                                console.log(`i couldn't reply to the message: ` + err.message)
                        })
  }, ms(time));
                }
        },
};
