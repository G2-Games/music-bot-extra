// Add required libraries
const fs = require('fs-extra')
const path = require('node:path');
const {
    getVoiceConnection
} = require('@discordjs/voice');
const {
    Client,
    Collection,
    Events,
    GatewayIntentBits
} = require('discord.js');

// Read the config file
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates
    ]
});


// Grab all events from ./events
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

// Register the created commands and cooldown
client.commands = new Collection();
client.cooldowns = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

// Find all subfolders
for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    // Find all commands
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);

        // Set a new item in the Collection with the key as the command name and the value as the exported module
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}

// Log in to Discord with the client token
client.login(token);

process.on('SIGINT', () => {
    console.log('\nProcess terminated with Control+C, leaving all voice channels');
    console.log(getVoiceConnection(myVoiceChannel.guild.id));
    process.exit();
});
