const {
   SlashCommandBuilder,
   PermissionFlagsBits,
   ChatInputCommandInteraction
} = require("discord.js");
const { useMainPlayer } = require("discord-player");

module.exports = {
   data: new SlashCommandBuilder()
      .setName("music")
      .setDescription("Play and control music in the server")
      .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
      .addSubcommand(subcommand =>
         subcommand
            .setName("play")
            .setDescription("Play a music/playlist")
            .addStringOption(option =>
               option
                  .setName("query")
                  .setDescription("The query of a song/playlist")
                  .setRequired(true)
            )
      ),
   /**
    *
    * @param {ChatInputCommandInteraction} interaction
    */
   async execute(interaction) {
      await interaction.deferReply();

      const subcommand = interaction.options.getSubcommand();

      const channel = interaction.member.voice.channel;

      const player = useMainPlayer();

      if (!channel)
         return interaction.reply({
            content: "You need to join a voice channel first.",
            ephemeral: true
         });

      if (subcommand === "play") {
         const query = interaction.options.getString("query");

         try {
            const { track } = await player.play(channel, query, {
               nodeOptions: { metadata: interaction }
            });

            return interaction.followUp(`\`${track.title}\` enqueued`);
         } catch (err) {
            console.error(err);
         }
      }
   }
};
