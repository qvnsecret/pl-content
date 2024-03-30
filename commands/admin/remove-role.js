const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
        name: "remove-role",
        description: `remove a role for a user.`,
        run: async (client, message, args) => {
                const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

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

                if (message.member.roles.highest.position < member.roles.highest.position)
                        return message.reply({
                                content:
                                        `:rolling_eyes: **You can't remove role ${member.user.username} have higher role than you**`
                                , ephemeral: true
                        }).catch((err) => {
                                console.log(`i couldn't reply to the message: ` + err.message)
                        })

                if (!guilds) return message.reply({ content: `:rolling_eyes: **I couldn't mute that user. Please check my permissions and role position.**`, ephemeral: true }).catch((err) => {
                        console.log(`i couldn't reply to the message: ` + err.message)
           })

        let role = message.mentions.roles.first() || message.guild.roles.cache.find(r => r.name.toLocaleLowerCase().includes(args[1]))|| message.guild.roles.cache.get(args[1])

          if(!role) return message.reply({ content: `:rolling_eyes: - ** Please specify one role name **`, ephemeral: true }).catch((err) => {
                        console.log(`i couldn't reply to the message: ` + err.message)
           })

          if(!member.roles.cache.has(role.id)) {
        member.roles.remove(role.id)
   let embed = new MessageEmbed()
  .setDescription(`:white_check_mark: Changed roles ${member.user.username}, - **${role.name}**`)
.setColor(message.guild.me.displayHexColor)        
          message.reply({embeds: [embed]}).catch((err) => {
     console.log(`i couldn't reply to the message: ` + err.message) 
            })         
         } else {
    member.roles.remove(role.id)   
   let embed = new MessageEmbed()
  .setDescription(`:white_check_mark: Changed roles ${member.user.username}, - **${role.name}**`)
.setColor(message.guild.me.displayHexColor)      
          message.reply({embeds: [embed]}).catch((err) => {
     console.log(`i couldn't reply to the message: ` + err.message) 
            })
          }
    },
};
