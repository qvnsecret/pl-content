const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: 'ticket',
    aliases: ['t'],
    description: "Manage ticket system",
    utilisation: '{prefix}ticket',
    
    async execute(client, message, args) {
        let args1 = args[0];
        let time = 10000; // 10 seconds
        let ticketCreate = ['new', 'create', 'add', 'enable'];
        let ticketClose = ['remove', 'disable', 'close'];
        const prefix = '.'; // Using a hardcoded prefix as requested

        if (!args1) {
            let ticketEmbed = new MessageEmbed()
                .setColor("#2b2d31")
                .setTitle(`Ticket System`)
                .setDescription('Please create a ticket if needed.')
                .setThumbnail('https://cdn.discordapp.com/attachments/902034619791196221/905040476355330068/8b7193b2110a034a2fe037437afc80b3.gif')
                .addField(`Use the following commands: ${prefix}ticket create <To create a ticket> | ${prefix}ticket close <To close a ticket>`, 'You can discuss your issue in the new channel once it is created.')
                .setFooter(`Requested by ${message.author.username}`, `${message.author.displayAvatarURL()}`)
                .setTimestamp(Date.now());
            message.channel.send({ embeds: [ticketEmbed] });
            return;
        }

        // Handle Ticket Creation
        if (ticketCreate.includes(args1.toLowerCase())) {
            if (message.channel.type === 'GUILD_TEXT') {
                let buttonYes = new MessageButton()
                    .setStyle("SUCCESS")
                    .setCustomId("confirmTicketCreation")
                    .setLabel("Yes")
                    .setEmoji("✔️");
                let buttonNo = new MessageButton()
                    .setStyle("DANGER")
                    .setCustomId("cancelTicketCreation")
                    .setLabel("No")
                    .setEmoji("❌");
                let row = new MessageActionRow()
                    .addComponents(buttonYes, buttonNo);
                let ticketCreateEmbed = new MessageEmbed()
                    .setColor("#2b2d31")
                    .setTitle(`Create Ticket`)
                    .setDescription('Are you sure you want to open a new ticket?')
                    .setFooter(`Requested by ${message.author.username}`, `${message.author.displayAvatarURL()}`)
                    .setTimestamp(Date.now());
                message.channel.send({ embeds: [ticketCreateEmbed], components: [row] });
            } else {
                message.channel.send(`You cannot use this command here, please use it in a designated ticket channel.`).then(msg => msg.delete({ timeout: time }));
            }
        }

        // Handle Ticket Closure
        if (ticketClose.includes(args1.toLowerCase())) {
            let buttonClose = new MessageButton()
                .setStyle("SUCCESS")
                .setCustomId("confirmTicketClose")
                .setLabel("Yes")
                .setEmoji("✔️");
            let buttonCancel = new MessageButton()
                .setStyle("DANGER")
                .setCustomId("cancelTicketClose")
                .setLabel("No")
                .setEmoji("❌");
            let row = new MessageActionRow()
                .addComponents(buttonClose, buttonCancel);
            let ticketCloseEmbed = new MessageEmbed()
                .setColor("#2b2d31")
                .setTitle(`Close Ticket`)
                .setDescription('Are you sure you want to close this ticket?')
                .setFooter(`Requested by ${message.author.username}`, `${message.author.displayAvatarURL()}`)
                .setTimestamp();
            message.channel.send({ embeds: [ticketCloseEmbed], components: [row] });
        }
    }
};
