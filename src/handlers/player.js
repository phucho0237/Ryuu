const { useMainPlayer } = require("discord-player");

var colors = require("colors/safe");

module.exports = client => {
   const player = useMainPlayer();

   player.events.on("playerStart", (queue, track) => {
      queue.metadata.channel.send(`Started playing \`${track.title}\``);
   });
};
