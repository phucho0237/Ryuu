const { Events, ChatInputCommandInteraction, Client } = require("discord.js");

module.exports = {
   name: Events.InteractionCreate,
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
