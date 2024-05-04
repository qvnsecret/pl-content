const client = require("../index");

client.on("interactionCreate", async (interaction) => {
    if (interaction.isCommand()) {
        handleSlashCommand(interaction);
    } else if (interaction.isContextMenu()) {
        handleContextMenu(interaction);
    } else if (interaction.isButton()) {
        handleButtonInteraction(interaction);
    }
});

async function handleSlashCommand(interaction) {
    await interaction.deferReply({ ephemeral: false }).catch(() => {});
    const cmd = client.slashCommands.get(interaction.commandName);
    if (!cmd) {
        return interaction.followUp({ content: "An error has occurred" });
    }

    const args = [];
    for (let option of interaction.options.data) {
        if (option.type === "SUB_COMMAND") {
            if (option.name) args.push(option.name);
            option.options?.forEach(x => {
                if (x.value) args.push(x.value);
            });
        } else if (option.value) {
            args.push(option.value);
        }
    }
    interaction.member = interaction.guild.members.cache.get(interaction.user.id);
    cmd.run(client, interaction, args);
}

async function handleContextMenu(interaction) {
    await interaction.deferReply({ ephemeral: false });
    const command = client.slashCommands.get(interaction.commandName);
    if (command) command.run(client, interaction);
}

async function handleButtonInteraction(interaction) {
    if (interaction.customId === "create_ticket") {
        createTicket(interaction);
    } else if (interaction.customId === "confirm_close_ticket") {
        closeTicket(interaction);
    } else if (interaction.customId === "cancel_close_ticket") {
        cancelTicket(interaction);
    }
}

async function createTicket(interaction) {
    const supportCategory = interaction.guild.channels.cache.find(c => c.name === "Support Tickets" && c.type === "GUILD_CATEGORY");
    if (!supportCategory) {
        return interaction.reply({ content: "Support Ticket category does not exist! Please create one.", ephemeral: true });
    }

    const ticketChannel = await interaction.guild.channels.create(`ticket-${interaction.user.tag}`, {
        type: 'GUILD_TEXT',
        parent: supportCategory.id,
        permissionOverwrites: [
            { id: interaction.guild.id, deny: ['VIEW_CHANNEL'] },
            { id: interaction.user.id, allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'] },
        ],
    });

    ticketChannel.setTopic(`Ticket Owner: ${interaction.user.id}`);
    interaction.reply({ content: `Your ticket has been created! <#${ticketChannel.id}>`, ephemeral: true });
}

async function closeTicket(interaction) {
    interaction.update({
        content: 'Closing this ticket...',
        embeds: [],
        components: []
    }).then(() => {
        setTimeout(() => {
            interaction.channel.delete().catch(err => console.error("Failed to delete the channel:", err));
        }, 5000);
    });
}

async function cancelTicket(interaction) {
    interaction.update({
        content: 'Ticket closure canceled.',
        embeds: [],
        components: []
    });
}
