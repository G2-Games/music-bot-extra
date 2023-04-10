const { Events, GuildChannelManager } = require('discord.js');

module.exports = {
    name: Events.VoiceStateUpdate,
    once: false,
    execute(oldState, newState) {
        const channelId = newState.channelId;
        const channelIdOld = oldState.channelId;
        const member = oldState.member;

        //console.log(channelId);
        //console.log(member);

        if (channelId) {
            console.log(`${member.user.tag} joined ${channelId}`);
            return;
        } else {
            console.log(`${member.user.tag} left\ \  ${channelIdOld}`);
        }
    },
};
