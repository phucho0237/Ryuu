const { Events, ChatInputCommandInteraction, Client } = require("discord.js");

var colors = require("colors/safe");

module.exports = {
   name: Events.InteractionCreate,
   once: true,
   /**
    *
    * @param {ChatInputCommandInteraction} interaction
    * @param {Client} client
    */
   async execute(interaction, client) {
      if (!interaction.isChatInputCommand()) return;

      const command = interaction.client.commands.get(interaction.commandName);
      if (!command) return;

      try {
         await command.execute(interaction, client);
      } catch (err) {
         console.error(err);
      }
   }
};
