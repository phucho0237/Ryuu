const {
   SlashCommandBuilder,
   PermissionFlagsBits,
   ChatInputCommandInteraction,
   EmbedBuilder
} = require("discord.js");

module.exports = {
   data: new SlashCommandBuilder()
      .setName("servers")
      .setDescription("Lists all server the bot is in")
      .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
   ownerOnly: true,
   /**
    *
    * @param {ChatInputCommandInteraction} interaction
    */
   async execute(interaction) {
      const guildsList = interaction.client.guilds.cache
         .map(g => `${g.name} (ID: ${g.id})`)
         .join("\n");

      interaction.reply({
         embeds: [
            new EmbedBuilder()
               .setColor("#6AD9F3")
               .setDescription(`${guildsList}`)
         ],
         ephemeral: true
      });
   }
};
