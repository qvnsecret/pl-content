const { MessageEmbed, Util } = require("discord.js");

module.exports = {
    name: "addemoji",
    description: "Add emojis to the server (can add multiple emojis at the same time).",
    run: async (client, message, args) => {
        const permission = message.member.permissions.has("MANAGE_EMOJIS_AND_STICKERS");
        if (!permission) {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription("**You don't have permission >:(**");
            return message.reply({ embeds: [embed] });
        }

        let emojis = args.join(' ').match(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/gi);
        if (!emojis) {
            const embed = new MessageEmbed()
                .setColor("#2b2d31")
                .setDescription("**Please provide emojis to add.**");
            return message.reply({ embeds: [embed] });
        }

        let emojisA = [];
        emojis.forEach((emote) => {
            let emoji = Util.parseEmoji(emote);
            if (emoji.id) {
                const Link = `https://cdn.discordapp.com/emojis/${emoji.id}.${emoji.animated ? "gif" : "png"}`;
                message.guild.emojis.create(`${Link}`, `${emoji.name}`).then((em) => {
                    emojisA.push(em.toString())
                    if (emojis.length == emojisA.length) {
                        const embed = new MessageEmbed()
                            .setColor("#2b2d31")
                            .setDescription(`${emojisA.map(e => e).join(',')} **Done added emoji**`);
                        message.reply({ embeds: [embed] }).catch((err) => {
                            console.log(`I couldn't reply to the message: ` + err.message);
                        });
                        emojisA = [];
                    }
                }).catch((error) => {
                    const embed = new MessageEmbed()
                        .setColor("#2b2d31")
                        .setDescription("Error: " + error.message);
                    message.reply({ embeds: [embed] }).catch((err) => {
                        console.log(`I couldn't reply to the message: ` + err.message);
                    });
                });
            }
        });
    },
};
