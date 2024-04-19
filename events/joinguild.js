const config = require("../config") 

const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js") 
const client = require("../../index") 
client.on('guildCreate', guild => {
    const channel = guild.channels.cache.find(channel => channel.type === 'GUILD_TEXT' && channel.permissionsFor(guild.me).has('SEND_MESSAGES'))
 let embed = new MessageEmbed()
 .setColor('#2b2d31')
 .setTitle('**__CONNECTED TO NEW SERVER__**')
 .setURL('https://discord.gg/5enJVWgY4m')
 .setDescription(`My prefix is \`.\``)
 
 .addFields(
 { name: 'Bot Owner', value: '\`qvnrvx\`' }
 )

 .setImage('https://cdn.discordapp.com/attachments/1218607459925753969/1229064062051291297/discordstatus_4.png?ex=6623c61b&is=6622749b&hm=8178ddef17c945061d189f0bd49f4699bf6c835f8178bd4682220213d9aa6dc3&')
 .setTimestamp()
 .setFooter('mhm', 'Test');
channel.send({embeds : [embed]});
}) 
