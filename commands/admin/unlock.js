const { Message, Client } = require("discord.js");

module.exports = {
        name: "unlock",
        description: `Allows everyone to send messages in specific channel.`,
        run: async (client, message, args) => {
                const permission = message.member.permissions.has("MANAGE_CHANNELS");
                const guilds = message.guild.me.permissions.has("MANAGE_CHANNELS");

                if (!permission)
                        return message.reply(
                                { content: ":x: **You don't have permission to use this command**", ephemeral: true }
                        ).catch((err) => {
                                console.log(`i couldn't reply to the message: ` + err.message)
                        })

                if (!guilds) return message.reply({ content: `:rolling_eyes: **I couldn't change the channel permissions. Please check my permissions.**`, ephemeral: true }).catch((err) => {
                        console.log(`i couldn't reply to the message: ` + err.message)
                })
                let everyone = message.guild.roles.cache.find(hyper => hyper.name === '@everyone');
                message.channel.permissionOverwrites.edit(everyone, {
                        SEND_MESSAGES: true
                }).then(() => {
                        message.reply({ content: `:unlock: **${message.channel.name} has been unlocked.**`, ephemeral: true })
                })
        },
};