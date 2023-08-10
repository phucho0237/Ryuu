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
      )
      .addSubcommand(subcommand =>
         subcommand
            .setName("reroll")
            .setDescription("Reroll the giveaway")
            .addStringOption(option =>
               option
                  .setName("query")
                  .setDescription("The ID of the giveaway messages")
                  .setRequired(true)
            )
      )
      .addSubcommand(subcommand =>
         subcommand
            .setName("delete")
            .setDescription("Delete the giveaway")
            .addStringOption(option =>
               option
                  .setName("query")
                  .setDescription("The ID of the giveaway messages")
                  .setRequired(true)
            )
      )
      .addSubcommand(subcommand =>
         subcommand
            .setName("end")
            .setDescription("End the giveaway")
            .addStringOption(option =>
               option
                  .setName("query")
                  .setDescription("The ID of the giveaway messages")
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
            content: "Successfully started the giveaway.",
            ephemeral: true
         });
      } else if (subcommand === "reroll") {
         const query = interaction.options.getString("query");

         const giveaway = interaction.client.giveawaysManager.giveaways.find(
            g => g.guildId === interaction.guildId && g.messageId === query
         );
         if (!giveaway)
            return interaction.reply({
               content: `Unable to find a giveaway for \`${query}\``
            });

         interaction.client.giveawaysManager
            .reroll(query)
            .then(() => {
               interaction.reply({
                  content: "Successfully rerolled the giveaway.",
                  ephemeral: true
               });
            })
            .catch(err => {
               interaction.reply({
                  content: `There was a problem when trying to execute this command. Please try again later.`,
                  ephemeral: true
               });
               console.error(err);
            });
      } else if (subcommand === "delete") {
         const query = interaction.options.getString("query");

         const giveaway = interaction.client.giveawaysManager.giveaways.find(
            g => g.guildId === interaction.guildId && g.messageId === query
         );
         if (!giveaway)
            return interaction.reply({
               content: `Unable to find a giveaway for \`${query}\``
            });

         interaction.client.giveawaysManager
            .delete(query)
            .then(() => {
               interaction.reply({
                  content: "Successfully deleted the giveaway.",
                  ephemeral: true
               });
            })
            .catch(err => {
               interaction.reply({
                  content: `There was a problem when trying to execute this command. Please try again later.`,
                  ephemeral: true
               });
               console.error(err);
            });
      } else if (subcommand === "end") {
         const query = interaction.options.getString("query");

         const giveaway = interaction.client.giveawaysManager.giveaways.find(
            g => g.guildId === interaction.guildId && g.messageId === query
         );
         if (!giveaway)
            return interaction.reply({
               content: `Unable to find a giveaway for \`${query}\``
            });

         interaction.client.giveawaysManager
            .end(query)
            .then(() => {
               interaction.reply({
                  content: "Successfully ended the giveaway."
               });
            })
            .catch(err => {
               interaction.reply({
                  content: `There was a problem when trying to execute this command. Please try again later.`,
                  ephemeral: true
               });
               console.error(err);
            });
      } else return;
   }
};
