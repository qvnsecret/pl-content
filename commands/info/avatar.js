const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

module.exports = {
  name: "avatar",
  description: 'Sending a target user avatar URL.',
  aliases: ['av'],
  run: async (client, message, args) => {
    const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

    // Extract avatar URLs in different formats
    const avatarURLs = {
      png: Member.user.displayAvatarURL({ format: 'png', size: 4096 }),
      webp: Member.user.displayAvatarURL({ format: 'webp', size: 4096 }),
      jpeg: Member.user.displayAvatarURL({ format: 'jpeg', size: 4096 }),
      gif: Member.user.displayAvatarURL({ format: 'gif', dynamic: true, size: 4096 }), // Only works if it is a GIF
      jpg: Member.user.displayAvatarURL({ format: 'jpg', size: 4096 })
    };

    let embed = new MessageEmbed()
      .setTimestamp()
      .setTitle(`Avatar of ${Member.user.tag}`)
      .setURL(Member.user.displayAvatarURL({ size: 4096, dynamic: true }))
      .setColor("#2b2d31")
      .setAuthor(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
      .setImage(avatarURLs.png)
      .setFooter(`Avatar of ${Member.user.tag}`, Member.user.displayAvatarURL({ size: 4096, dynamic: true }));

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
  },
};
