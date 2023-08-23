const {
   SlashCommandBuilder,
   PermissionFlagsBits,
   ChatInputCommandInteraction
} = require("discord.js");
const ms = require("ms");

module.exports = {
   data: new SlashCommandBuilder()
      .setName("slowmode")
      .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
      .setDescription("Set slow mode for the channel")
      .addStringOption(option =>
         option
            .setName("time")
            .setDescription("The time you want for the slow mode")
            .setRequired(true)
      ),
   /**
    *
    * @param {ChatInputCommandInteraction} interaction
    */
   async execute(interaction) {
      const time = interaction.options.getString("time");

      const convertedTime = Math.abs(ms(time));

      if (convertedTime > 21600)
         return interaction.reply({
            content: "Maximum slow mode is 6 hours.",
            ephemeral: true
         });

      if (convertedTime === 0) {
         await interaction.channel.setRateLimitPerUser(0);

         interaction.reply({
            content: "Successfully turned off slow mode"
         });
      } else {
         await interaction.channel.setRateLimitPerUser(convertedTime / 1000);

         interaction.reply({
            content: "Successfully set the channel slow mode."
         });
      }

      /* Implement: Automatically convert seconds to other units */
   }
};
