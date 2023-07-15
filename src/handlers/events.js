const fs = require("fs");

var colors = require("colors/safe");

module.exports = client => {
   let eventsArray = [];

   const eventsFolder = fs.readdirSync("./src/events");

   for (const folder of eventsFolder) {
      const eventsFile = fs.readdirSync(`./src/events/${folder}`);

      for (const file of eventsFile) {
         const event = require(`../events/${folder}/${file}`);

         if ("name" in event && "execute" in event) {
            const eventName = file.split(".")[0];

            eventsArray.push(eventName);

            if (event.once) {
               client.once(event.name, (...args) => event.execute(...args));
            } else {
               client.on(event.name, (...args) => event.execute(...args));
            }
         } else {
            continue;
         }
      }
   }

   console.log(
      colors.cyan(`[HANDLERS] | ${eventsArray.length} event(s) loaded`)
   );
};
