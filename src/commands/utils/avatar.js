const {
   SlashCommandBuilder,
   PermissionFlagsBits,
   ChatInputCommandInteraction,
   EmbedBuilder
} = require("discord.js");

module.exports = {
   data: new SlashCommandBuilder()
      .setName("avatar")
      .setDescription("Show the avatar of user")
      .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
      .addUserOption(option =>
         option
            .setName("user")
            .setDescription("The user you want to get the avatar")
            .setRequired(true)
      ),
   /**
    *
    * @param {ChatInputCommandInteraction} interaction
    */
   async execute(interaction) {
      await interaction.deferReply();

      const target = interaction.options.getMember("user");

      interaction.editReply({
         embeds: [
            new EmbedBuilder()
               .setColor("#6AD9F3")
               .setDescription(
                  `**[${
                     target.user.username
                  }'s avatar](${target.user.displayAvatarURL()})**`
               )
               .setImage(
                  `${target.user.displayAvatarURL({ dynamic: true })}?size=256`
               )
         ]
      });
   }
};
