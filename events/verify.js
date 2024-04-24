// main bot file, after client initialization
client.on('messageReactionAdd', async (reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;

    const { message } = reaction;
    const config = JSON.parse(fs.readFileSync(`./verifyConfig-${message.guild.id}.json`, 'utf8'));

    if (message.id === config.messageId && reaction.emoji.name === '✅') {
        const role = message.guild.roles.cache.get(config.roleId);
        const member = message.guild.members.cache.get(user.id);
        if (role && member) {
            member.roles.add(role).catch(console.error);
        }
    }
});
