const client = require("../index");

client.on('ready', () => {
console.log(`I'am ${client.user.tag} and nigger.`)
  client.user.setStatus("idle")
    client.user.setActivity(`Aesthetical`, { type: 'WATCHING' })
});
