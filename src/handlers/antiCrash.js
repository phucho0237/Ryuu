module.exports = client => {
   process.on("unhandledRejection", (reason, p) => {
      console.log("[AntiCrash] | Unhandled Rejection/Catch".red);
      console.log(reason, p);
   });
   process.on("uncaughtException", (err, origin) => {
      console.log("[AntiCrash] | Uncaught Exception/Catch".red);
      console.log(err, origin);
   });
   process.on("uncaughtExceptionMonitor", (err, origin) => {
      console.log("[AntiCrash] | Uncaught Exception/Catch (Monitor)".red);
      console.log(err, origin);
   });
};
