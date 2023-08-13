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
      const user = interaction.options.getUser("user");
      const time = interaction.options.getString("time");
      const reason =
         interaction.options.getString("reason") || "No reason provided";

      const member = interaction.guild.members.fetch({ user: user.id });
      const timeMs = ms(time);

      if (!interaction.member.permissions.has(PermissionFlagsBits.ManageGuild))
         return interaction.reply({
            content: "You don't have permission to use this command.",
            ephemeral: true
         });

      if (!member)
         return interaction.reply({
            content: "I can't find this member.",
            ephemeral: true
         });

      if (!timeMs || isNaN(timeMs))
         return interaction.reply({
            content: "Invalid duration, please try again.",
            ephemeral: true
         });

      if (timeMs < 1000)
         return interaction.reply({
            content: "The time must be longer than 1 second.",
            ephemeral: true
         });

      if (timeMs > 2419200000)
         return interaction.reply({
            content: "The time must be shorter than 28 days."
         }); // 2419200000 = 28 days

      if (!member.moderatable)
         return interaction.reply({
            content: "I can't timeout this user.",
            ephemeral: true
         });

      if (
         member.roles.highest.position >=
         interaction.member.roles.highest.position
      )
         return interaction.reply({
            content:
               "You can't timeout this user since they have the same/higher role than you",
            ephemeral: true
         });

      try {
         await member
            .timeout(timeMs, reason)
            .then(() =>
               user.send(
                  `You have been timed out for ${time} for reason: \`${reason}\``
               )
            );

         interaction.reply({
            content: `Successfully timeout <@${user.id}> for \`${time}\``
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
