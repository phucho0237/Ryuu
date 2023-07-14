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
            name: "/help for help",
            type: ActivityType.Watching
         }
      ],
      status: "dnd"
   }
});

client.config = require("./config");

client.commands = new Collection();
client.cooldowns = new Collection();

["events", "slashCommands", "antiCrash"].forEach(file => {
   require(`./handlers/${file}`)(client);
});

client.login(client.config.bot.token);
