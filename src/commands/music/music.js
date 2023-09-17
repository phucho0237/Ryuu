const {
   SlashCommandBuilder,
   PermissionFlagsBits,
   ChatInputCommandInteraction,
   EmbedBuilder
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

      const player = useMainPlayer();
      const queue = useQueue(interaction.guild.id);

      const channel = interaction.member.voice.channel;

      if (!channel)
         return interaction.editReply({
            content: "You need to join a voice channel first."
         });

      if (queue && queue.channel.id !== channel.id)
         return interaction.editReply({
            content: "I'm already playing in a different voice channel."
         });

      if (subcommand === "play") {
         const query = interaction.options.getString("query");

         const searchResult = await player.search(query, {
            requestedBy: interaction.user
         });
         if (!searchResult)
            return interaction.editReply({
               content: `No track found for \`${query}\``
            });

         try {
            await player.play(channel, searchResult, {
               nodeOptions: { metadata: interaction.channel }
            });

            interaction.editReply({
               embeds: [
                  new EmbedBuilder()
                     .setColor("#6AD9F3")
                     .setDescription("Loading your track...")
               ]
            });
         } catch (err) {
            interaction.editReply({
               content:
                  "There was a problem when trying to execute this command. Please try again later."
            });
            console.error(err);
         }
      } else if (subcommand === "stop") {
         if (!queue)
            return interaction.editReply({
               content: "There is no playing queue is this guild!"
            });

         queue.delete();

         interaction.channel.send({
            embeds: [
               new EmbedBuilder()
                  .setColor("#6AD9F3")
                  .setDescription("Stopped the queue.")
            ]
         });
      } else if (subcommand === "skip") {
         if (!queue)
            return interaction.editReply({
               content: "There is no playing queue is this guild!"
            });

         queue.node.skip();

         interaction.channel.send({
            embeds: [
               new EmbedBuilder()
                  .setColor("#6AD9F3")
                  .setDescription("Skipped the current track.")
            ]
         });
      } else if (subcommand === "pause") {
         if (!queue)
            return interaction.editReply({
               content: "There is no playing queue is this guild!"
            });

         if (queue.node.isPaused())
            return interaction.editReply({
               content: "The queue is already paused."
            });

         queue.node.pause();

         interaction.channel.send({
            embeds: [
               new EmbedBuilder()
                  .setColor("#6AD9F3")
                  .setDescription("Paused the queue.")
            ]
         });
      } else if (subcommand === "resume") {
         if (!queue)
            return interaction.editReply({
               content: "There is no playing queue is this guild!"
            });

         if (queue.node.isPlaying())
            return interaction.editReply({
               content: "The queue is already playing."
            });

         queue.node.resume();

         interaction.channel.send({
            embeds: [
               new EmbedBuilder()
                  .setColor("#6AD9F3")
                  .setDescription("Resuned the queue.")
            ]
         });
      }
   }
};
