const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
        name: "role-all",
        description: `Add a roles for a user.`,
        run: async (client, message, args) => {

                const permission = message.member.permissions.has("MANAGE_ROLES");
                const guilds = message.guild.me.permissions.has("MANAGE_ROLES");

                if (!permission)
                        return message.reply(
                                { content: ":x: **You don't have permission to use this command**", ephemeral: true }
                        ).catch((err) => {
                                console.log(`i couldn't reply to the message: ` + err.message)
                        })        

                if (!guilds) return message.reply({ content: `:rolling_eyes: **I couldn't mute that user. Please check my permissions and role position.**`, ephemeral: true }).catch((err) => {
                        console.log(`i couldn't reply to the message: ` + err.message)
           })

        let role = message.mentions.roles.first() || message.guild.roles.cache.find(r => r.name.toLocaleLowerCase().includes(args[2]))|| message.guild.roles.cache.get(args[2])

          if(!role) return message.reply({ content: `:rolling_eyes: - ** Please specify one role name **`, ephemeral: true }).catch((err) => {
                        console.log(`i couldn't reply to the message: ` + err.message)
           })

   let users = message.guild.members.cache.filter(e => !e.roles.cache.map(e => e.id).includes(role.id))
   users.forEach(user => {
       user.roles.add(role.id)
   })
       let embed = new MessageEmbed()
  .setDescription(`:white_check_mark: **Changing roles for ${users.size} members, + ${role.name}**`)
.setColor(message.guild.me.displayHexColor)      
          message.reply({embeds: [embed]}).catch((err) => {
     console.log(`i couldn't reply to the message: ` + err.message) 
            })      
    },
};
