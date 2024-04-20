const { MessageButton, MessageActionRow, MessageEmbed, Client, MessageSelectMenu } = require("discord.js");
const { glob } = require("glob");
const { promisify } = require("util");

module.exports = {
    name: "invite",
    description: 'Invite & Support our bot. You will help us a lot.',
    aliases: [],
    run: async (client,message, args) => {

  let button = new MessageActionRow()
        .addComponents(
            new MessageButton()
  .setStyle('LINK')
  .setLabel('Invite the Bot')
  .setURL(`https://discord.com/oauth2/authorize?client_id=1223343717184835754`))

            .addComponents(
            new MessageButton()
  .setStyle('LINK')
  .setLabel('Bug Server')
  .setURL(`https://discord.gg/5enJVWgY4m`))

    let embed = new MessageEmbed()
.setTitle(`Support & Invite`) 
.setDescription(`If you really wanna support us and [invite](https://discord.com/oauth2/authorize?client_id=1223343717184835754) our bot to reach our goal, we appreciate it alot.
We are currently at \`${guilds.size}\` guilds!`)  
.setColor(`#2b2d31`)

      .setTimestamp()

    message.reply({ embeds:[embed], components:[button] })
          },
};
