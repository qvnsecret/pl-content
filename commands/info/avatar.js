const { MessageButton, MessageActionRow, MessageEmbed } = require("discord.js");
const axios = require('axios');

module.exports = {
  name: "avatar",
  description: 'Sending a target user avatar URL.',
  aliases: ['av'],
  run: async (client, message, args) => {
    const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

    try {
      const { data } = await axios.get(`https://discord.com/api/users/${Member.id}`, {
        headers: {
          Authorization: `Bot ${client.config.discord.token}`,
        },
      });

      const avatarURLs = {
        png: `https://cdn.discordapp.com/avatars/${Member.id}/${data.avatar}.png?size=4096`,
        webp: `https://cdn.discordapp.com/avatars/${Member.id}/${data.avatar}.webp?size=4096`,
        jpeg: `https://cdn.discordapp.com/avatars/${Member.id}/${data.avatar}.jpeg?size=4096`,
        gif: `https://cdn.discordapp.com/avatars/${Member.id}/${data.avatar}.gif?size=4096`,
        jpg: `https://cdn.discordapp.com/avatars/${Member.id}/${data.avatar}.jpg?size=4096`,
      };

      const bannerData = data.banner? `https://cdn.discordapp.com/banners/${Member.id}/${data.banner}.${data.banner.startsWith('a_')? 'gif' : 'png'}?size=4096` : null;

      let embed = new MessageEmbed()
       .setTimestamp()
       .setTitle(`Avatar of ${Member.user.tag}`)
       .setURL(Member.user.displayAvatarURL({ size: 4096, dynamic: true }))
       .setColor("#2b2d31")
       .setAuthor(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
       .setFooter(`Avatar of ${Member.user.tag}`, Member.user.displayAvatarURL({ size: 4096, dynamic: true }));

      if (bannerData) embed.setThumbnail(bannerData);
      embed.setImage(avatarURLs.png);

      let button1 = new MessageButton()
       .setStyle('LINK')
       .setLabel('Download PNG')
       .setURL(avatarURLs.png);

      let button2 = new MessageButton()
       .setStyle('LINK')
       .setLabel('Download WEBP')
       .setURL(avatarURLs.webp);

      let button3 = new MessageButton()
       .setStyle('LINK')
       .setLabel('Download JPEG')
       .setURL(avatarURLs.jpeg);

      let button4 = new MessageButton()
       .setStyle('LINK')
       .setLabel('Download GIF')
       .setURL(avatarURLs.gif);

      let button5 = new MessageButton()
       .setStyle('LINK')
       .setLabel('Download JPG')
       .setURL(avatarURLs.jpg);

      let row = new MessageActionRow()
       .addComponents(button1, button2, button3, button4, button5);

      message.reply({ embeds: [embed], components: [row] });
    } catch (error) {
      console.error(error);
      message.reply('An error occurred while fetching the user data.');
    }
  },
};
