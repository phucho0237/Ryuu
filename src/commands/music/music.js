const {
   SlashCommandBuilder,
   PermissionFlagsBits,
   ChatInputCommandInteraction
} = require("discord.js");
const { useMainPlayer, useQueue } = require("discord-player");

module.exports = {
   data: new SlashCommandBuilder()
      .setName("music")
      .setDescription("Play and control music in the server")
      .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
      .addSubcommand(subcommand =>
         subcommand
            .setName("play")
            .setDescription("Play a song/playlist")
            .addStringOption(option =>
               option
                  .setName("query")
                  .setDescription("The query of a song/playlist")
                  .setRequired(true)
            )
      )
      .addSubcommand(subcommand =>
         subcommand.setName("stop").setDescription("Stop the player")
      )
      .addSubcommand(subcommand =>
         subcommand.setName("skip").setDescription("Skip a song")
      )
      .addSubcommand(subcommand =>
         subcommand.setName("pause").setDescription("Pause the player")
      )
      .addSubcommand(subcommand =>
         subcommand.setName("resume").setDescription("Resume the player")
      ),
   /**
    *
    * @param {ChatInputCommandInteraction} interaction
    */
   async execute(interaction) {
      await interaction.deferReply();

      const subcommand = interaction.options.getSubcommand();

      const channel = interaction.member.voice.channel;

      if (!channel)
         return interaction.reply({
            content: "You need to join a voice channel first.",
            ephemeral: true
         });

      const player = useMainPlayer();
      const queue = useQueue(interaction.guild.id);

      if (subcommand === "play") {
         const query = interaction.options.getString("query");

         const searchResult = await player.search(query, {
            requestedBy: interaction.user
         });
         if (!searchResult.hasTracks)
            return interaction.editReply({
               content: `No track found for \`${query}\``
            });
         const { track } = await player.play(channel, searchResult, {
            nodeOptions: { metadata: interaction }
         });

         interaction.followUp(`\`${track.title}\` enqueued`);
      } else if (subcommand === "stop") {
         if (!queue)
            return interaction.editReply({
               content: "There is no playing queue is this guild!"
            });

         queue.clear();
         queue.node.stop();
         interaction.followUp({
            content: "Stopped the queue"
         });
      } else if (subcommand === "skip") {
         if (!queue)
            return interaction.editReply({
               content: "There is no playing queue is this guild!"
            });

         queue.node.skip();
         interaction.followUp("Successfully skipped");
      } else if (subcommand === "pause") {
         if (!queue)
            return interaction.editReply({
               content: "There is no playing queue is this guild!"
            });

         queue.node.setPaused(!queue.node.isPaused());
         interaction.followUp("Successfully paused the player");
      } else if (subcommand === "resume") {
         if (!queue)
            return interaction.editReply({
               content: "There is no playing queue is this guild!"
            });

         queue.node.resume();
         interaction.followUp("Successfully resumed the player");
      }
   }
};