const {
   SlashCommandBuilder,
   PermissionFlagsBits,
   ChatInputCommandInteraction,
   PermissionsBitField
} = require("discord.js");

module.exports = {
   data: new SlashCommandBuilder()
      .setName("nuke")
      .setDescription("Nuke a channel")
      .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
   /**
    *
    * @param {ChatInputCommandInteraction} interaction
    */
   async execute(interaction) {
      if (
         !interaction.member.permissions.has(
            PermissionsBitField.Flags.ManageChannels
         )
      )
         return interaction.reply({
            content: "You don't have permission to use this command.",
            ephemeral: true
         });

      await interaction.channel.clone().then(c => {
         c.setPosition(interaction.channel.position).then(
            interaction.channel.delete()
         );

         c.send({
            content: `Nuked by <@${interaction.user.id}>`
         });
      });
   }
};