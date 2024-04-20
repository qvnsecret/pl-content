const client = require("../index");

client.on('ready', () => {
console.log(`I'am ${client.user.tag}, the best bot & app in the world :skull:`)
  client.user.setStatus("idle")
    client.user.setActivity(`Guilds ${guilds.size}`, { type: 'LISTENING' })
});
