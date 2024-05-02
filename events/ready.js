const client = require("../index");

client.on('ready', () => {
    console.log(`I am ${client.user.tag}, the best bot & app in the world :skull:`);
    client.user.setStatus("online");
    const guildCount = client.guilds.cache.size;
    client.user.setActivity(`Protecting ${guildCount} guilds`);
});

