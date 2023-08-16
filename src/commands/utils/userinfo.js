const {
   SlashCommandBuilder,
   PermissionFlagsBits,
   ChatInputCommandInteraction,
   EmbedBuilder
} = require("discord.js");

module.exports = {
   data: new SlashCommandBuilder()
      .setName("userinfo")
      .setDescription("Get information about the user")
      .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
      .addUserOption(option =>
         option
            .setName("user")
            .setDescription("The user you want to see the information")
      ),
   /**
    *
    * @param {ChatInputCommandInteraction} interaction
    */
   async execute(interaction) {
      await interaction.deferReply();

      const user = interaction.options.getUser("user") || interaction.user;

      const member = interaction.guild.members.cache.get(user.id);

      interaction.editReply({
         embeds: [
            new EmbedBuilder()
               .setColor("#6AD9F3")
               .setAuthor({
                  name: user.username,
                  iconURL: user.avatarURL({ size: 256 })
               })
               .setThumbnail(`${user.avatarURL()}`)
               .setDescription(`<@${user.id}>`)
               .addFields(
                  {
                     name: "Joined",
                     value: `<t:${Math.floor(
                        member.joinedTimestamp / 1000
                     )}:f>`,
                     inline: true
                  },
                  {
                     name: "Registered",
                     value: `<t:${Math.floor(user.createdTimestamp / 1000)}:f>`,
                     inline: true
                  },
                  {
                     name: `Roles [${member.roles.cache.size - 1}]`,
                     value: `${member.roles.cache
                        .toJSON()
                        .filter(r => r.name !== "@everyone")
                        .join(" ")}`
                  }
               )
               .setFooter({ text: `User ID: ${user.id}` })
         ]
      });
   }
};
