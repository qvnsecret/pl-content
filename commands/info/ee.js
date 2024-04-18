const { MessageButton, MessageActionRow, MessageEmbed, Client, MessageSelectMenu } = require("discord.js");
const { glob } = require("glob");
const { promisify } = require("util");

module.exports = {
    name: "e",
    description: 'many eee',
    aliases: [],
    run: async (client,message, args) => {

          let embed = new MessageEmbed()
      .setTitle(`EEEEEE`)      
      .setImage(`https://static.wikia.nocookie.net/meme-basement/images/c/c0/C2a7885a3916fc003b44656851d9d5b8.jpg/revision/latest?cb=20191225232843`)
      .setFooter(`eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee`)

      .setColor(`#2b2d31`)

            .setTimestamp()

          message.reply({ embeds:[embed]})
                },
      };
