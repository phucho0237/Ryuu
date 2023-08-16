const {
   SlashCommandBuilder,
   PermissionFlagsBits,
   ChatInputCommandInteraction,
   EmbedBuilder,
   ChannelType
} = require("discord.js");

module.exports = {
   data: new SlashCommandBuilder()
      .setName("serverinfo")
      .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
      .setDescription("Get information about the server"),
   /**
    *
    * @param {ChatInputCommandInteraction} interaction
    */
   async execute(interaction) {
      await interaction.deferReply();

      interaction.editReply({
         embeds: [
            new EmbedBuilder()
               .setColor("#6AD9F3")
               .setAuthor({
                  name: interaction.guild.name
               })
               .setThumbnail(`${interaction.guild.iconURL()}`)
               .addFields(
                  {
                     name: "Owner",
                     value: `<@${
                        (await interaction.guild.fetchOwner()).user.id
                     }>`,
                     inline: true
                  },
                  {
                     name: "Category Channels",
                     value: `${
                        interaction.guild.channels.cache
                           .filter(c => c.type === ChannelType.GuildCategory)
                           .toJSON().length
                     }`,
                     inline: true
                  },
                  {
                     name: "Text Channels",
                     value: `${
                        interaction.guild.channels.cache
                           .filter(c => c.type === ChannelType.GuildText)
                           .toJSON().length
                     }`,
                     inline: true
                  },
                  {
                     name: "Voice Channels",
                     value: `${
                        interaction.guild.channels.cache
                           .filter(c => c.type === ChannelType.GuildVoice)
                           .toJSON().length
                     }`,
                     inline: true
                  },
                  {
                     name: "Members",
                     value: `${interaction.guild.memberCount}`,
                     inline: true
                  },
                  {
                     name: "Roles",
                     value: `${interaction.guild.roles.cache.size - 1}`,
                     inline: true
                  },
                  {
                     name: "Roles List",
                     value: `${interaction.guild.roles.cache
                        .toJSON()
                        .filter(r => r.name !== "@everyone")
                        .join(", ")}`
                  }
               )
               .setFooter({
                  text: `Server ID: ${
                     interaction.guild.id
                  } | Created At: ${interaction.guild.createdAt.toDateString()}`
               })
         ]
      });
   }
};
