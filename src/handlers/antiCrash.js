var colors = require("colors/safe");

module.exports = client => {
   process.on("unhandledRejection", (reason, p) => {
      console.log(colors.red("[AntiCrash] | Unhandled Rejection/Catch"));
      console.log(reason, p);
   });
   process.on("uncaughtException", (err, origin) => {
      console.log(colors.red("[AntiCrash] | Uncaught Exception/Catch"));
      console.log(err, origin);
   });
   process.on("uncaughtExceptionMonitor", (err, origin) => {
      console.log(
         colors.red("[AntiCrash] | Uncaught Exception/Catch (Monitor)")
      );
      console.log(err, origin);
   });
};
