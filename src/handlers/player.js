const { useMainPlayer } = require("discord-player");
const { EmbedBuilder } = require("discord.js");

module.exports = client => {
   const player = useMainPlayer();

   player.events.on("playerStart", (queue, track) => {
      queue.metadata.send({
         embeds: [
            new EmbedBuilder()
               .setColor("#6AD9F3")
               .setAuthor({
                  name: "Now playing",
                  iconURL: track.requestedBy.displayAvatarURL()
               })
               .setDescription(`\`${track.title} - (${track.duration})\``)
               .setImage(`${track.thumbnail}`)
               .setFooter({
                  text: `Requested by: ${track.requestedBy.username}`,
                  iconURL: track.requestedBy.displayAvatarURL()
               })
               .setTimestamp()
         ]
      });
   });

   player.events.on("audioTrackAdd", (queue, track) => {
      queue.metadata.send({
         embeds: [
            new EmbedBuilder()
               .setColor("#6AD9F3")
               .setDescription(
                  `<@${track.requestedBy.id}> added \`${track.title}\` to the queue.`
               )
         ]
      });
   });

   player.events.on("audioTracksAdd", (queue, tracks) => {
      queue.metadata.send({
         embeds: [
            new EmbedBuilder()
               .setColor("#6AD9F3")
               .setDescription(`Added ${tracks.length} tracks.`)
         ]
      });
   });

   player.events.on("playerSkip", (queue, track) => {
      queue.metadata.send({
         embeds: [
            new EmbedBuilder()
               .setColor("#6AD9F3")
               .setDescription(
                  `<@${track.requestedBy.id}> skipped \`${track.title}\``
               )
         ]
      });
   });

   player.events.on("disconnect", queue => {
      queue.metadata.send({
         embeds: [
            new EmbedBuilder()
               .setColor("#6AD9F3")
               .setDescription("Looks like my job here is done, leaving now.")
         ]
      });
   });

   player.events.on("emptyChannel", queue => {
      queue.metadata.send({
         embeds: [
            new EmbedBuilder()
               .setColor("#6AD9F3")
               .setDescription("Feeling lonely, leaving now.")
         ]
      });
   });

   player.events.on("emptyQueue", queue => {
      queue.metadata.send({
         embeds: [
            new EmbedBuilder()
               .setColor("#6AD9F3")
               .setDescription("No more tracks to play.")
         ]
      });
   });

   player.events.on("error", (queue, error) => {
      queue.metadata.send({
         embeds: [
            new EmbedBuilder()
               .setColor("Red")
               .setDescription(
                  "An error occurred while playing. Please try again later."
               )
         ]
      });
      console.log(error);
   });

   player.events.on("playerError", (queue, error) => {
      queue.metadata.send({
         embeds: [
            new EmbedBuilder()
               .setColor("Red")
               .setDescription(
                  "An error occurred while playing. Please try again later."
               )
         ]
      });
      console.log(error);
   });
};
