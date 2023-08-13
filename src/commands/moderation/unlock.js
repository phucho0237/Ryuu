const {
   SlashCommandBuilder,
   PermissionFlagsBits,
   ChatInputCommandInteraction
} = require("discord.js");

module.exports = {
   data: new SlashCommandBuilder()
      .setName("unlock")
      .setDescription("Unlock a channel")
      .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
   /**
    *
    * @param {ChatInputCommandInteraction} interaction
    */
   async execute(interaction) {
      if (
         !interaction.member.permissions.has(PermissionFlagsBits.ManageChannels)
      )
         return interaction.reply({
            content: "You don't have permission to use this command.",
            ephemeral: true
         });

      try {
         await interaction.channel.permissionOverwrites
            .edit(interaction.guild.roles.everyone, { SendMessages: true })
            .then(() =>
               interaction.reply({ content: "This channel is unlocked" })
            );
      } catch (err) {
         interaction.reply({
            content:
               "There was a problem when trying to execute this command. Please try again later."
         });
         console.error(err);
      }
   }
};
