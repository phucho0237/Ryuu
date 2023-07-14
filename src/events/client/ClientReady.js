const { Events, Client } = require("discord.js");

var colors = require("colors/safe");

module.exports = {
   name: Events.ClientReady,
   once: true,
   /**
    *
    * @param {Client} client
    */
   execute(client) {
      console.log(
         colors.green(
            `[CLIENT] | Logged in as ${client.user.tag} (ID: ${client.user.id})`
         )
      );
   }
};
