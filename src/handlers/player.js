const { useMainPlayer } = require("discord-player");

var colors = require("colors/safe");

module.exports = client => {
   const player = useMainPlayer();

   player.events.on("playerStart", (queue, track) => {
      queue.metadata.send(`Started playing: **${track.title}**`);
   });

   // player.events.on("audioTrackAdd", (queue, track) => {
   //    queue.metadata.send(`Track **${track.title}** queued`);
   // });

   // player.events.on("audioTracksAdd", (queue, track) => {
   //    queue.metadata.send(`Multiple Track's queued`);
   // });

   player.events.on("playerSkip", (queue, track) => {
      queue.metadata.send(`Skipping **${track.title}** due to an issue!`);
   });

   player.events.on("disconnect", queue => {
      queue.metadata.send("Looks like my job here is done, leaving now!");
   });
   player.events.on("emptyChannel", queue => {
      queue.metadata.send(
         `Leaving because no vc activity for the past 5 minutes`
      );
   });
   player.events.on("emptyQueue", queue => {
      queue.metadata.send("Queue finished!");
   });

   // player.on("debug", async message => {
   //    console.log(`General player debug event: ${message}`);
   // });

   // player.events.on("debug", async (queue, message) => {
   //    console.log(`Player debug event: ${message}`);
   // });

   player.events.on("error", (queue, error) => {
      console.log(`General player error event: ${error.message}`);
      console.log(error);
   });

   player.events.on("playerError", (queue, error) => {
      console.log(`Player error event: ${error.message}`);
      console.log(error);
   });
};
