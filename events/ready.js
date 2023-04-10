const { Events } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`Bot has started! Logged in as ${client.user.tag}`);
    },
};
