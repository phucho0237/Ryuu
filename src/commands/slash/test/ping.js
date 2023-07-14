const {
   SlashCommandBuilder,
   ChatInputCommandInteraction
} = require("discord.js");

module.exports = {
   data: new SlashCommandBuilder().setName("ping").setDescription("Pong!"),
   /**
    *
    * @param {ChatInputCommandInteraction} interaction
    */
   execute(interaction) {
      interaction.reply({ content: "Pong", ephemeral: true });
   }
};
