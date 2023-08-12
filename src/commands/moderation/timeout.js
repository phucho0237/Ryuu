const {
   SlashCommandBuilder,
   PermissionFlagsBits,
   ChatInputCommandInteraction
} = require("discord.js");
const ms = require("ms");

module.exports = {
   data: new SlashCommandBuilder()
      .setName("timeout")
      .setDescription("Timeout a user")
      .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
      .addUserOption(option =>
         option
            .setName("user")
            .setDescription("The user you want to timeout")
            .setRequired(true)
      )
      .addStringOption(option =>
         option
            .setName("time")
            .setDescription("The time you want for the timeout")
            .setRequired(true)
      )
      .addStringOption(option =>
         option.setName("reason").setDescription("The reason for the timeout")
      ),
   /**
    *
    * @param {ChatInputCommandInteraction} interaction
    */
   async execute(interaction) {
      const user = interaction.options.getMember("user");
      const time = interaction.options.getString("time");
      const reason =
         interaction.options.getString("reason") || "No reason provided";

      if (!interaction.member.permissions.has(PermissionFlagsBits.ManageGuild))
         return interaction.reply({
            content: "You don't have permission to use this command.",
            ephemeral: true
         });

      if (
         !time.endsWith("s") &&
         !time.endsWith("m") &&
         !time.endsWith("h") &&
         !time.endsWith("d")
      )
         return interaction.reply({
            content: "The time you provided must be like this: 1s, 2m, 3h,...",
            ephemeral: true
         });

      try {
         await user.timeout(ms(time), reason);
         interaction
            .reply({
               content: `Successfully timeout <@${user.id}> for \`${time}\``
            })
            .then(() =>
               user.send(
                  `You have been timed out for ${time} for reason: \`${reason}\``
               )
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
