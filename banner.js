const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

module.exports = {
  name: "banner",
  description: 'Sending a target user banner URL.',
  aliases: ['bn'],
  run: async (client, message, args) => {
    const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

    // Fetch the full user object including banner data
    const user = await client.users.fetch(Member.id, { force: true });

    // Check if the user has a banner set
    const bannerURL = user.bannerURL({ format: 'png', size: 4096 });
    if (!bannerURL) {
      return message.reply({ embeds: [new MessageEmbed().setColor("#2b2d31").setDescription("This user does not have a banner set.")] });
    }

    let embed = new MessageEmbed()
      .setTimestamp()
      .setTitle(`Banner of ${Member.user.tag}`)
      .setURL(bannerURL)
      .setColor("#2b2d31")
      .setAuthor(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
      .setImage(bannerURL)
      .setFooter(`Banner of ${Member.user.tag}`, Member.user.displayAvatarURL({ size: 4096, dynamic: true }));

    let button = new MessageButton()
      .setStyle('LINK')
      .setLabel('Download Banner')
      .setURL(bannerURL);

    let row = new MessageActionRow()
      .addComponents(button);

    message.reply({ embeds: [embed], components: [row] });
  },
};
