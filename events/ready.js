const { Events, ActivityType } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: false,
    execute(client) {
        console.log(`Bot has started! Logged in as ${client.user.tag}`);
        client.user.setActivity(
            'Nanahira',
            {type: ActivityType.Listening}
        );
    },
};
