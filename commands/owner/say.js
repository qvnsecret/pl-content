const { Message, Client } = require("discord.js");

module.exports = {
        name: "say",
        description: `sends a message to the target channel.`,
        run: async (client, message, args) => {
                let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
                const msg = args.slice(1).join(' ')
                const permission = message.member.permissions.has("MANAGE_GUILD");
                const guilds = message.guild.me.permissions.has("MANAGE_MESSAGES");

                if (!permission) return message.reply({ content: ":x: **You don't have permission to use this command**" }).catch((err) => {
                        console.log(`I Couldn't Reply To The Message: ` + err.message)
                })

                if (!guilds) return message.reply({ content: `:rolling_eyes: **I couldn't clear messages. Please check my permissions and role position.**`, ephemeral: true })
                if (!channel) {
                        message.reply({ content: `:rolling_eyes: **Please mention a channel**` }).catch((err) => {
                                console.log(`I Couldn't Reply To The Message: ` + err.message)
                        })
                }
                if (channel) {
                        let image = message.attachments.first()
                        if (image) {
                                channel.send({ content: `${msg}`, files: [image.proxyURL] }).then(() => {
                                        message.delete()
                                }).catch((err) => {
                                        console.log(`I Couldn't Reply To The Message: ` + err.message)
                                })
                        }
                        if (!image) {
                                channel.send(`${msg}`).then(() => {
                                        message.delete()
                                }).catch((err) => {
                                        console.log(`I Couldn't Reply To The Message: ` + err.message)
                                })
                        }
                }
        },
};
