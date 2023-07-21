const {
   SlashCommandBuilder,
   PermissionFlagsBits,
   ChatInputCommandInteraction,
   EmbedBuilder
} = require("discord.js");

module.exports = {
   data: new SlashCommandBuilder()
      .setName("ping")
      .setDescription("Pong!")
      .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),
   /**
    *
    * @param {ChatInputCommandInteraction} interaction
    */
   async execute(interaction) {
      const msg = await interaction.deferReply({ fetchReply: true });

      interaction.editReply({
         embeds: [
            new EmbedBuilder()
               .setColor("#6AD9F3")
               .setDescription(
                  `Pong 🏓\n\nWebsocket Latency: \`${
                     interaction.client.ws.ping
                  }ms\`\nRoundtrip latency: \`${
                     msg.createdTimestamp - interaction.createdTimestamp
                  }ms\``
               )
         ]
      });
   }
};
