const { Message, Client, MessageEmbed } = require("discord.js");
const db = require('quick.db')

module.exports = {
        name: "remove-warn",
        description: `removes warn from a user.`,
        run: async (client, message, args) => {
                const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

                const permission = message.member.permissions.has("MANAGE_MESSAGES");
                if (!permission) return message.reply({ content: ":x: **You don't have permission to use this command**" }).catch((err) => {
                        console.log(`i couldn't reply to the message: ` + err.message)
                })

          if (member){
            if(!args[1]){
            let w = db.get(`warns_${member.id}`) || 0
            db.delete(`warns_${member.id}`)
            setTimeout(() => {
              message.reply({content: `:white_check_mark: **done removing ${w} warn/s from ${member.user.username}.**`})
                             },1000)
            }else{
              let c = args[1]
              if(c.isNaN) return
              let n;
              let w = db.get(`warns_${member.id}`)
              if(c > w){ n = w }else{ n = c }
              db.subtract(`warns_${member.id}`,n)
              setTimeout(() => {
              message.reply({content: `:white_check_mark: **done removed ${n} warnings from ${member.user.username}.**`})
                             },1000)
            }
            
          }else{
              message.reply({content: `:rolling_eyes: **Please mention member or id**`})
          }
        },
};