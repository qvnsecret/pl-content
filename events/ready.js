const client = require("../index");

client.on('ready', () => {
    console.log(`I am ${client.user.tag}, the best bot & app in the world :skull:`);
    client.user.setStatus("online");
    const guildCount = client.guilds.cache.size;
    client.user.setActivity(`${guildCount} guilds`, { type: 'LISTENING' }); // Shows as "Listening X guilds"

});

