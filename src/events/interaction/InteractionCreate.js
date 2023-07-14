const { Events, ChatInputCommandInteraction } = require("discord.js");

var colors = require("colors/safe");

module.exports = {
   name: Events.InteractionCreate,
   once: true,
   /**
    *
    * @param {ChatInputCommandInteraction} interaction
    */
   async execute(interaction) {
      if (!interaction.isChatInputCommand()) return;

      const command = interaction.client.commands.get(interaction.commandName);
      if (!command) return;

      try {
         await command.execute(interaction);
      } catch (err) {
         console.error(err);
      }
   }
};
