const { useMainPlayer } = require("discord-player");
const { EmbedBuilder } = require("discord.js");

module.exports = client => {
   const player = useMainPlayer();

   player.events.on("playerStart", (queue, track) => {
      queue.metadata.send({
         embeds: [
            new EmbedBuilder()
               .setAuthor({ name: "Now playing" })
               .setTitle(`${track.title}`)
               .setURL(`${track.url}`)
               .setThumbnail(`${track.thumbnail}`)
               .setFooter({
                  text: `Requested by: ${track.requestedBy.username}`,
                  iconURL: track.requestedBy.displayAvatarURL()
               })
         ]
      });
   });

   player.events.on("audioTrackAdd", (queue, track) => {
      queue.metadata.send({
         embeds: [
            new EmbedBuilder()
               .setAuthor({
                  name: `Track queued. Position: \`${
                     queue.node.getTrackPosition(track) + 1
                  }\``
               })
               .setTitle(`${track.title}`)
               .setURL(`${track.url}`)
               .setFooter({
                  text: `Requested by: ${track.requestedBy.username}`,
                  iconURL: track.requestedBy.displayAvatarURL()
               })
         ]
      });
   });

   player.events.on("audioTracksAdd", (queue, tracks) => {
      queue.metadata.send({
         embeds: [
            new EmbedBuilder()
               .setTitle(`${tracks.length} tracks queued.`)
               .setFooter({
                  text: `Requested by: ${tracks[0].requestedBy.username}`,
                  iconURL: tracks[0].requestedBy.displayAvatarURL()
               })
         ]
      });
   });

   player.events.on("playerSkip", (queue, track) => {
      queue.metadata.send({
         embeds: [
            new EmbedBuilder().setDescription(
               `Skipping \`${track.title}\` due to an issue.`
            )
         ]
      });
   });

   player.events.on("disconnect", queue => {
      queue.metadata.send({
         embeds: [
            new EmbedBuilder().setDescription(
               "Looks like my job here is done, leaving now."
            )
         ]
      });
   });
   player.events.on("emptyChannel", queue => {
      queue.metadata.send({
         embeds: [
            new EmbedBuilder().setDescription("Feeling lonely, leaving now.")
         ]
      });
   });
   player.events.on("emptyQueue", queue => {
      queue.metadata.send({
         embeds: [new EmbedBuilder().setDescription("No more tracks to play.")]
      });
   });

   player.events.on("error", (queue, error) => {
      queue.metadata.send({
         embeds: [
            new EmbedBuilder().setDescription(
               "An error occurred while playing. Please try again later."
            )
         ]
      });
      console.log(error);
   });

   player.events.on("playerError", (queue, error) => {
      queue.metadata.send({
         embeds: [
            new EmbedBuilder().setDescription(
               "An error occurred while playing. Please try again later."
            )
         ]
      });
      console.log(error);
   });
};
