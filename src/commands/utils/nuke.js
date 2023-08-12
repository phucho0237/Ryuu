const {
   SlashCommandBuilder,
   PermissionFlagsBits,
   ChatInputCommandInteraction
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
         !interaction.member.permissions.has(PermissionFlagsBits.ManageChannels)
      )
         return interaction.reply({
            content: "You don't have permission to use this command.",
            ephemeral: true
         });

      try {
         await interaction.channel.clone().then(c => {
            c.setPosition(interaction.channel.position).then(
               interaction.channel.delete()
            );

            c.send({
               content: `Nuked by <@${interaction.user.id}>`
            }).then(msg => {
               setTimeout(() => {
                  msg.delete().catch(err => console.error(err));
               }, 5000);
            });
         });
      } catch (err) {
         interaction.reply({
            content:
               "There was a problem when trying to execute this command. Please try again later."
         });
         console.error(err);
      }
   }
};
