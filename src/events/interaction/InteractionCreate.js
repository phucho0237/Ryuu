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

      if (command.ownerOnly) {
         const ownerIDArray = interaction.client.config.bot.ownerId;
         if (!ownerIDArray.includes(interaction.user.id))
            await interaction.reply({
               content: "You don't have permission to use this command.",
               ephemeral: true
            });
      }

      try {
         await command.execute(interaction);
      } catch (err) {
         console.error(err);
      }
   }
};
