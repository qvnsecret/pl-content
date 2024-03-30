const { MessageButton, MessageActionRow, MessageEmbed, Client, MessageSelectMenu } = require("discord.js");
const { glob } = require("glob");
const { promisify } = require("util");

module.exports = {
    name: "rules",
    description: ':)',
    aliases: [],
    run: async (client,message, args) => {

          let embed = new MessageEmbed()
      .setTitle(`RULES`)      
      .setImage(`https://global.discourse-cdn.com/schizophrenia/uploads/default/original/3X/6/3/6303613e19e5f72dceef4f36aec0150371e0010f.jpeg`)
      .setFooter(`Ye just follow the rules, easy!`)

      .setColor(message.guild.me.displayHexColor)

            .setTimestamp()

          message.reply({ embeds:[embed]})
                },
      };