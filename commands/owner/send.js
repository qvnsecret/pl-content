const { Message, Client } = require("discord.js");

module.exports = {
        name: "send",
        description: `sends a message to the target.`,
        run: async (client, message, args) => {
  const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  const msg = args.slice(1).join(' ');

                const permission = message.member.permissions.has("MANAGE_GUILD");
                if (!permission) return message.reply({ content: ":rolling_eyes: **You don't have permission**" }).catch((err) => {
                        console.log(`I Couldn't reply to the message: ` + err.message)
                })

                if (!args[0]) return message.reply({ content: `:rolling_eyes: **Please mention member or id**` }).catch((err) => {
                        console.log(`I Couldn't reply to the message: ` + err.message)
                })

                if (!member) return message.reply({ content: `:rolling_eyes: **I can't find this member**` }).catch((err) => {
                        console.log(`I Couldn't reply to the message: ` + err.message)
                })
                if (member) {
                        let image = message.attachments.first()
                        if (image) {
                                member.send({ content: `${msg}`, files: [image.proxyURL] }).then(() => {
                                        message.reply(`:white_check_mark: **Done sending the message**`).catch((err) => {
                                                console.log(`I Couldn't reply to the message: ` + err.message)
                                        })
                                }).catch((err) => {
                                        message.reply(`:x: **User has closed private messages.**`)
                                })
                        } else {
                                member.send({ content: `${msg}` }).then(() => {
                                        message.reply(`:white_check_mark: **Done sending the message**`).catch((err) => {
                                                console.log(`I Couldn't reply to the message: ` + err.message)
                                        })
                                }).catch((err) => {
                                        message.reply({ content: `:x: **User has closed private messages.**` }).catch((err) => {
                                                console.log(`I Couldn't reply to the message: ` + err.message)
                                        })
                                })
                        }
                }
        },
};
