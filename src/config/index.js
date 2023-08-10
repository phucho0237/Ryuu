require("dotenv").config();

module.exports = {
   bot: {
      token: process.env.TOKEN,
      clientId: process.env.CLIENT_ID,
      ownerId: ["1120195827038691429"]
   },
   db: {
      url: process.env.MONGO_URL
   }
};
