const { Message, Client, MessageEmbed } = require("discord.js");
const db = require('quick.db')

module.exports = {
        name: "warnings",
        description: `Get the list of warnings for the server or a user`,
        run: async (client, message, args) => {
                const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
                const permission = message.member.permissions.has("MANAGE_MESSAGES");
          
      if (!permission) return message.reply({ content: ":x: **You don't have permission to use this command**" }).catch((err) => {
                        console.log(`i couldn't reply to the message: ` + err.message)
                })

                if (!args[0]) return message.reply({ content: `:rolling_eyes: **Please mention member or id**` }).catch((err) => {
                        console.log(`i couldn't reply to the message: ` + err.message)
                })

                if (!member) return message.reply({ content: `:rolling_eyes: **I can't find this member**` }).catch((err) => {
                        console.log(`i couldn't reply to the message: ` + err.message)
                })

     let warns = await db.fetch(`warns_${member.id}`)

   if(!warns == null) warns = 0;
          
      let embed = new MessageEmbed()
  .setDescription(`Warn ID (${warns}) by ${member}`)
    message.reply({embeds: [embed] }) 
          
        },
};