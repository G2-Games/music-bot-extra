const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, Events } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    cooldown: 5,

    // Set up the command options
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play a song (Audio file or YouTube/Spotify)')
        .addStringOption(option =>
            option
                .setName('query')
                .setDescription('Song search query.'))
        .addAttachmentOption(option =>
            option
                .setName('file')
                .setDescription('An audio file to play')),

    async execute(interaction) {
        const voiceChannel = interaction.member.voice.channel;
        const query = interaction.options.getString('query');
        const file = interaction.options.getAttachment('file');

        // Ensure the user is in a voice channel
        if (!voiceChannel) {
            return interaction.reply({
                content: 'You must be in a voice channel to use this command!',
                ephemeral: true
            });
        }

        // Ensure the user input a valid query or file
        if (!query && !file || file.contentType.split('/')[0] != 'audio' || 'video') {
            return interaction.reply({
                content: 'Please include a valid query or audio file.',
                ephemeral: true
            });
        }

        // Create the media controls
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

        try {
            const connection = joinVoiceChannel({
                channelId:      interaction.member.voice.channel.id,
                guildId:        interaction.guild.id,
                adapterCreator: interaction.guild.voiceAdapterCreator,
            });
        } catch (error) {
            console.error(error);
            interaction.reply({
                content: 'ERROR: Could not join voice channel',
                ephemeral: true
            });
            return;
        }

        await interaction.reply({
            content: '[PLACEHOLDER] Music Information Stuffs',
            components: [row]
        });
    },
};
