require("dotenv").config();

module.exports = {
   bot: {
      token: process.env.TOKEN,
      clientId: process.env.CLIENT_ID
   }
};
