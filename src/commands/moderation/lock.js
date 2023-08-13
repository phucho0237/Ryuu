const {
   SlashCommandBuilder,
   PermissionFlagsBits,
   ChatInputCommandInteraction
} = require("discord.js");

module.exports = {
   data: new SlashCommandBuilder()
      .setName("lock")
      .setDescription("Lock a channel")
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
            .edit(interaction.guild.roles.everyone, { SendMessages: false })
            .then(() =>
               interaction.reply({ content: "This channel is locked" })
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
