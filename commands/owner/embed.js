const { MessageEmbed } = require("discord.js");

module.exports = {
        name: "embed",
        description: `sends a message as an embed.`,
        run: async (client, message, args) => {
                let args1 = args.slice(0).join(' ')
                const permission = message.member.permissions.has("MANAGE_GUILD");
                const guilds = message.guild.me.permissions.has("MANAGE_MESSAGES");

                if (!permission) return message.reply({ content: ":x: **You don't have permission to use this command**" }).catch((err) => {
                        console.log(`I Couldn't Reply To The Message: ` + err.message)
                })

                if (!guilds) return message.reply({ content: `:rolling_eyes: **I couldn't clear messages. Please check my permissions and role position.**` }).catch((err) => {
                        console.log(`I Couldn't Reply To The Message: ` + err.message)
                })

                if (!args1) {
                        message.reply({ content: `:rolling_eyes: **Please provide some args.**` })
                }
                let embed = new MessageEmbed()
                        .setAuthor(`${message.guild.name}`, message.guild.iconURL({ dynamic: true }))
                        .setColor(message.guild.me.displayHexColor)
                        .setTimestamp()

                let attach = message.attachments.first();
                if (attach) {
                        embed.setImage(attach.proxyURL)
                        if (args1) {
                                embed.setDescription(`${args1}`)
                        }
                }
                if (args1) {
                        embed.setDescription(`${args1}`)
                        message.channel.send({ embeds: [embed] })
                                .then(() => {
                                        message.delete()
                                })
                }
        },
};
