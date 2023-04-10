const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, Events } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play a song (Audio file or YouTube/Spotify)')
        .addStringOption(option =>
            option.setName('query')
                .setDescription('YouTube or Spotify query')
                .setRequired(true)),

    async execute(interaction) {
        const voiceChannel = interaction.member.voice.channel;
        const query = interaction.options.getString('query');

        if (!voiceChannel) {
            return interaction.reply({
                content: 'You must be in a voice channel to use this command!',
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
