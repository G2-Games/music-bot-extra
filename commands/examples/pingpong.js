const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, Events } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Experimental testing command!'),

    async execute(interaction) {
        const voiceChannel = interaction.member.voice.channel;

        if (voiceChannel == null) {
            return interaction.reply('You must be in a voice channel to use this command');
        }

        /*
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('skip-back')
                    .setStyle(ButtonStyle.Secondary)
                    .setEmoji('⏮'),

                new ButtonBuilder()
                    .setCustomId('play-pause')
                    .setStyle(ButtonStyle.Secondary)
                    .setEmoji('⏯️'),

                new ButtonBuilder()
                    .setCustomId('skip-forward')
                    .setStyle(ButtonStyle.Secondary)
                    .setEmoji('⏭'),
            );

        await interaction.reply({
            content: 'I think you should,',
            components: [row]
        });*/

        try {
            const connection = joinVoiceChannel({
                channelId: interaction.member.voice.channel.id,
                guildId: interaction.guild.id,
                adapterCreator: interaction.guild.voiceAdapterCreator,
            });
            interaction.reply(`Joined voice channel ${voiceChannel.name}`);
        } catch (error) {
            console.error(error);
            interaction.reply('Failed to join voice channel');
        }
    },
};
