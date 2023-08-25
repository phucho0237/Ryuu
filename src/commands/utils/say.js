const {
   SlashCommandBuilder,
   PermissionFlagsBits,
   ChatInputCommandInteraction
} = require("discord.js");

module.exports = {
   data: new SlashCommandBuilder()
      .setName("say")
      .setDescription("Make the bot say something")
      .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
      .addStringOption(option =>
         option
            .setName("message")
            .setDescription("The message you want the bot to send")
            .setRequired(true)
      ),
   /**
    *
    * @param {ChatInputCommandInteraction} interaction
    */
   async execute(interaction) {
      const message = interaction.options.getString("message");

      interaction.channel.send(message);

      interaction.reply({
         content: "Successfully sent the message",
         ephemeral: true
      });
   }
};
