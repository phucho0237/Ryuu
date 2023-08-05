const {
   SlashCommandBuilder,
   PermissionFlagsBits,
   ChatInputCommandInteraction
} = require("discord.js");
const ms = require("ms");

module.exports = {
   data: new SlashCommandBuilder()
      .setName("giveaway")
      .setDescription("Create and manage giveaway in the server")
      .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
      .addSubcommand(subcommand =>
         subcommand
            .setName("start")
            .setDescription("Start the giveaway")
            .addStringOption(option =>
               option
                  .setName("duration")
                  .setDescription("The duration of the giveaway")
                  .setRequired(true)
            )
            .addIntegerOption(option =>
               option
                  .setName("winners")
                  .setDescription("The number of winners")
                  .setRequired(true)
            )
            .addStringOption(option =>
               option
                  .setName("prize")
                  .setDescription("The prize of the giveaway")
                  .setRequired(true)
            )
      ),
   /**
    *
    * @param {ChatInputCommandInteraction} interaction
    */
   async execute(interaction) {
      if (
         !interaction.member.permissions.has(PermissionFlagsBits.ManageMessages)
      )
         return interaction.reply({
            content: "You don't have permission to use this command.",
            ephemeral: true
         });

      const subcommand = interaction.options.getSubcommand();

      if (subcommand === "start") {
         const duration = interaction.options.getString("duration");
         const winners = interaction.options.getInteger("winners");
         const prize = interaction.options.getString("prize");

         await interaction.client.giveawaysManager.start(interaction.channel, {
            duration: ms(duration),
            winnerCount: winners,
            prize,
            messages: {
               giveaway: "",
               giveawayEnded: "",
               title: "{this.prize}",
               drawing: "Ends: {timestamp}",
               dropMessage: "Be the first to react with 🎉",
               inviteToParticipate: "React with 🎉 to participate",
               winMessage:
                  "Congratulations {winners}! You won the **{this.prize}**",
               embedFooter: "{this.winnerCount} winner(s)",
               noWinner:
                  "No valid entrants, so a winner could not be determined!",
               hostedBy: "Hosted by: {this.hostedBy}",
               winners: "Winner(s):",
               endedAt: "Ended at"
            }
         });

         interaction.reply({
            content: "Giveaway has started!",
            ephemeral: true
         });
      }
   }
};
