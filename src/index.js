const {
   Client,
   IntentsBitField,
   Partials,
   ActivityType,
   Collection
} = require("discord.js");

const client = new Client({
   intents: [
      IntentsBitField.Flags.Guilds,
      IntentsBitField.Flags.GuildMembers,
      IntentsBitField.Flags.GuildMessages
   ],
   partials: [Object.keys(Partials)],
   presence: {
      activities: [
         {
            name: "with Hutao ♥",
            type: ActivityType.Playing
         }
      ],
      status: "dnd"
   }
});

client.config = require("./config");

client.commands = new Collection();
client.slashCommands = new Collection();
client.cooldowns = new Collection();
client.aliases = new Collection();

// Handler loader

client.login(client.config.bot.token);
