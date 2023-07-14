const fs = require("fs");
const path = require("path");

var colors = require("colors/safe");

module.exports = client => {
   let i = 0;

   const commandsFolder = fs.readdirSync(
      path.join(__dirname, "./src/commands/message")
   );

   for (const folder of commandsFolder) {
      const commandsFile = fs.readdirSync(
         path.join(__dirname, `./src/commands/message/${folder}`)
      );

      for (const file of commandsFile) {
         const command = fs.readdirSync(
            path.join(__dirname, `./src/commands/message/${folder}/${file}`)
         );

         if (command.name) {
            client.commands.set(command.name, command);
            i++;
         } else {
            continue;
         }

         if (command.aliases && Array.isArray(command.aliases))
            command.aliases.forEach(alias =>
               client.aliases.set(alias, command.name)
            );
      }
   }

   console.log(colors.cyan(`[HANDLERS] | ${i} command(s) loaded`));
};