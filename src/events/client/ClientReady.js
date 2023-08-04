const { Events, Client } = require("discord.js");
const mongoose = require("mongoose");

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

      if (!client.config.db.url)
         return console.log(
            colors.yellow(
               `[WARNING] | You don't provide any MongoDB url in .env file, some commands will not working properly`
            )
         );
      mongoose.connect(client.config.db.url);

      mongoose.connection.once("open", () => {
         console.log(colors.magenta("[MONGO] | Connected successfully"));
      });
      mongoose.connection.on("error", err => {
         console.error(err);
      });
   }
};
