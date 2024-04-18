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

    let embed = new MessageEmbed()
.setTitle(`Social Media`) 
.setDescription(`This bot was made by \`ogqvnrvx\`. This bot isn't made by the offical roblox Aesthetical. This bot was made for educational purposes only. We have a favor for you, [invite](https://discord.com/oauth2/authorize?client_id=1223343717184835754) and join our [Support Server](https://discord.gg/637NNhhS8n) :)`)     
.setColor(`#2b2d31`)

      .setTimestamp()

    message.reply({ embeds:[embed], components:[button] })
          },
};
