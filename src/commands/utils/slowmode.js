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
      .setDescription("Set slowmode for the channel")
      .addStringOption(option =>
         option
            .setName("time")
            .setDescription("The time you want for the slowmode")
            .setRequired(true)
      ),
   /**
    *
    * @param {ChatInputCommandInteraction} interaction
    */
   async execute(interaction) {
      const time = interaction.options.getString("time");

      if (time.startsWith("-"))
         return interaction.reply({
            content:
               "The duration you provided is not positive. Please try again.",
            ephemeral: true
         });

      if (!time.endsWith("s") && !time.endsWith("m") && !time.endsWith("h"))
         return interaction.reply({
            content: "Invalid duration, please try again.",
            ephemeral: true
         });

      let convertedTime = ms(time) / 1000;

      await interaction.channel
         .setRateLimitPerUser(convertedTime)
         .then(() =>
            interaction.reply({
               content: `Successfully set slowmode for this channel to ${convertedTime}s`,
               ephemeral: true
            })
         );
   }
};
