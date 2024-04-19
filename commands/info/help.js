const { MessageButton, MessageActionRow, MessageEmbed, Client, MessageSelectMenu } = require("discord.js");
const { glob } = require("glob");
const { promisify } = require("util");

module.exports = {
    name: "help",
    description: 'Feeling lost?',
    aliases: [],
    run: async (client,message, args) => {
        const globPromise = promisify(glob);
        const adminFiles = await globPromise(`${process.cwd()}/commands/admin/**/*.js`);   
        const infoFiles = await globPromise(`${process.cwd()}/commands/info/**/*.js`);   
        const ownerFiles = await globPromise(`${process.cwd()}/commands/owner/**/*.js`);  
      
       let menu = new MessageSelectMenu()
      .setCustomId(`help_${message.author.id}`)
      .setPlaceholder("Choose a category")
         
      .addOptions([
						{
							label: 'Info',
							description: 'To view the info commands',
							value: 'info',
              emoji: '<:info:1220474955687399504>',
						},
            {
							label: 'Owner',
							description: 'To view the owner commands',
							value: 'owner',
              emoji: '<:owner:1220474945633652826>',
            },
            {
							label: 'Admin',
							description: 'To view the admin commands',
							value: 'admin',
              emoji: '<:employee:1220475795412090891>',
            }])
    
   let row = new MessageActionRow()
      .addComponents([menu]);
  let button = new MessageActionRow()

        .addComponents(
            new MessageButton()
  .setStyle('LINK')
  .setLabel('Bug Server')
  .setURL(`https://discord.gg/n2DR6VJtgP`))
    
       .addComponents(
            new MessageButton()
  .setStyle('LINK')
  .setLabel('Server Support')
  .setURL(`https://discord.com/invite/886Z9JUdXY`))
    let embed = new MessageEmbed()    

    .setTitle(`**Mytho**`)
    .setDescription(`**Thank you for choosing our bot, <:mytho:1230996358081544222> \`Mytho\`. Below, you\'ll find a comprehensive list of all available commands for your convenience.**
    Bot Prefix: ${client.config.prefix}help`)
	                .addFields(
                { name: '# Info', value: `edeedededed`, inline: true };
            )
    .setThumbnail(`https://cdn.discordapp.com/attachments/1223568250810404925/1223568278719561769/noFilter.png?ex=661a53c2&is=6607dec2&hm=85090d587e60078ca67e9b5750ea35688773b494e4fa9de2e317dd52f6dc4181&`)
	    .setImage('https://cdn.discordapp.com/attachments/1218607459925753969/1229064062051291297/discordstatus_4.png?ex=662e521b&is=661bdd1b&hm=72f4b2365b4f0330643d98517e1f30e9cc85a7c068e1c73848fd740736f60a8c&')
      .setFooter(`This bot isn't made by the offical roblox Aesthetical. This bot was made for educational purposes only.`)

.setColor(`#2b2d31`)
      .setTimestamp()
    message.reply({ embeds:[embed], components:[row, button] }).then( msg => {
      let filter = b => b.user.id === message.author.id && b.customId === `help_${message.author.id}`;
      let collector = msg.createMessageComponentCollector({ filter:filter, componentType: 'SELECT_MENU', time:120000 });
      collector.on("collect", (b) => {
      if(b.values[0] === "admin") {   
      let embed_1 = new MessageEmbed()
       .setColor(`#2b2d31`)
      .setTimestamp()
          
    adminFiles.map((value) => {
        const file = require(value);
        const splitted = value.split("/");
        const directory = splitted[splitted.length - 2];

        if (file.name) {
            const properties = { directory, ...file };
            embed_1.addField(`${client.config.prefix}${properties.name}`, `${properties.description}`, true)
        }
    })
          b.update({ embeds:[embed_1], components:[row, button] }).catch(err => {});
        } else if(b.values[0] === "info") {
      let embed_1 = new MessageEmbed()
       .setColor(`#2b2d31`)
      .setTimestamp()
                 
    infoFiles.map((value) => {
        const file = require(value);
        const splitted = value.split("/");
        const directory = splitted[splitted.length - 2];

        if (file.name) {
            const properties = { directory, ...file };
            embed_1.addField(`${client.config.prefix}${properties.name}`, `${properties.description}`, true)
        }
    })
          b.update({ embeds:[embed_1], components:[row, button] }).catch(err => {});
        } else if(b.values[0] === "owner")
  {
let embed_1 = new MessageEmbed()
       .setColor(`#2b2d31`)
      .setTimestamp()
                 
    ownerFiles.map((value) => {
        const file = require(value);
        const splitted = value.split("/");
        const directory = splitted[splitted.length - 2];

        if (file.name) {
            const properties = { directory, ...file };
            embed_1.addField(`${client.config.prefix}${properties.name}`, `${properties.description}`, true)
        }
    })
          b.update({ embeds:[embed_1], components:[row, button] }).catch(err => {});  }
      });
    });
   },
};
