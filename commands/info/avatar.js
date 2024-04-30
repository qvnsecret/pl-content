const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const axios = require('axios');

module.exports = {
  name: 'avatar',
  description: 'Sending a target user avatar URL.',
  aliases: ['av', 'avatar'],

  async execute(client, message, args) {
    const Member = getMember(message, args[0]);

    try {
      const { data } = await axios.get(`https://discord.com/api/users/${Member.id}`, {
        headers: {
          Authorization: `Bot ${client.config.discord.token}`,
        },
      });

      const avatarURLs = getAvatarURLs(data.avatar, Member.id);
      const bannerData = data.banner ? getBanner(data.banner, Member.id) : null;
      const embed = createEmbed(data.accent_color, bannerData, Member, avatarURLs);
      const buttons = createButtons(avatarURLs);

      return message.channel.send({ embeds: [embed], components: [buttons] });
    } catch (error) {
      console.error(error);
      return message.channel.send('An error occurred while fetching the user data.');
    }
  },
};

function getMember(message, memberId) {
  if (!memberId) memberId = message.author.id;
  const member = message.mentions.members.first() || message.guild.members.cache.get(memberId) || message.member;
  return member;
}

function getAvatarURLs(avatar, id) {
  const avatarURLs = {
    png: `https://cdn.discordapp.com/avatars/${id}/${avatar}.png?size=4096`,
    webp: `https://cdn.discordapp.com/avatars/${id}/${avatar}.webp?size=4096`,
    jpeg: `https://cdn.discordapp.com/avatars/${id}/${avatar}.jpeg?size=4096`,
    gif: `https://cdn.discordapp.com/avatars/${id}/${avatar}.gif?size=4096`,
    jpg: `https://cdn.discordapp.com/avatars/${id}/${avatar}.jpg?size=4096`,
  };
  return avatarURLs;
}

function getBanner(banner, id) {
  const extention = banner.startsWith('a_') ? '.gif' : '.png';
  const url = `https://cdn.discordapp.com/banners/${id}/${banner}${extention}?size=4096`;
  return url;
}

function createEmbed(accentColor, bannerData, Member, avatarURLs) {
  const embed = new MessageEmbed()
    .setTimestamp()
    .setTitle(`Avatar of ${Member.user.tag}`)
    .setURL(Member.user.displayAvatarURL({ size: 4096, dynamic: true }))
    .setColor(accentColor || '#2b2d31')
    .setAuthor(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
    .setFooter(`Avatar of ${Member.user.tag}`, Member.user.displayAvatarURL({ size: 4096, dynamic: true }));

  if (bannerData) embed.setThumbnail(bannerData);
  embed.setImage(avatarURLs.png);

  return embed;
}

function createButtons(avatarURLs) {
  const btn1 = new MessageButton().setStyle('url').setLabel('Download PNG').setURL(avatarURLs.png);
  const btn2 = new MessageButton().setStyle('url').setLabel('Download WEBP').setURL(avatarURLs.webp);
  const btn3 = new MessageButton().setStyle('url').setLabel('Download JPEG').setURL(avatarURLs.jpeg);
  const btn4 = new MessageButton().setStyle('url').setLabel('Download GIF').setURL(avatarURLs.gif);
  const btn5 = new MessageButton().setStyle('url').setLabel('Download JPG').setURL(avatarURLs.jpg);

  const row = new MessageActionRow().addComponents(btn1, btn2, btn3, btn4, btn5);
  return row;
}
