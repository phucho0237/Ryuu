const {
   Client,
   IntentsBitField,
   Partials,
   ActivityType,
   Collection
} = require("discord.js");
const { Player } = require("discord-player");

const { loadExtractors } = require("./function/extractors");
const { GiveawayManagerWithOwnDatabase } = require("./utils/giveawaysManager");

const client = new Client({
   intents: [
      IntentsBitField.Flags.Guilds,
      IntentsBitField.Flags.GuildMembers,
      IntentsBitField.Flags.GuildMessages,
      IntentsBitField.Flags.GuildMessageReactions,
      IntentsBitField.Flags.GuildVoiceStates
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

const player = new Player(client);
player.extractors.loadDefault();

const manager = new GiveawayManagerWithOwnDatabase(client, {
   default: {
      embedColor: "#6AD9F3",
      embedColorEnd: "#FF2C2C"
   }
});

client.config = require("./config");

client.commands = new Collection();

client.giveawaysManager = manager;

["events", "slashCommands", "antiCrash", "player"].forEach(async file => {
   await require(`./handlers/${file}`)(client);
});

client.login(client.config.bot.token);
