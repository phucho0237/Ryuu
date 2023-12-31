const fs = require("fs");
const { REST, Routes } = require("discord.js");

var colors = require("colors/safe");

module.exports = client => {
   let slashCommandsArray = [];

   const slashCommandsFolder = fs.readdirSync("./src/commands");

   for (const folder of slashCommandsFolder) {
      const slashCommandsFile = fs
         .readdirSync(`./src/commands/${folder}`)
         .filter(f => f.endsWith(".js"));

      for (const file of slashCommandsFile) {
         const slashCommand = require(`../commands/${folder}/${file}`);

         if ("data" in slashCommand && "execute" in slashCommand) {
            client.commands.set(slashCommand.data.name, slashCommand);
            slashCommandsArray.push(slashCommand.data.toJSON());
         } else {
            continue;
         }
      }
   }

   const rest = new REST().setToken(client.config.bot.token);

   (async () => {
      try {
         const data = await rest.put(
            Routes.applicationCommands(client.config.bot.clientId),
            { body: slashCommandsArray }
         );

         console.log(
            colors.cyan(
               `[HANDLERS] | ${data.length} application (/) commands loaded`
            )
         );
      } catch (err) {
         console.error(err);
      }
   })();
};
