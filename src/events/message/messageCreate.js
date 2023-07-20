const {
   Events,
   Message,
   EmbedBuilder,
   ActionRowBuilder,
   ButtonBuilder,
   ButtonStyle
} = require("discord.js");

module.exports = {
   name: Events.MessageCreate,
   /**
    *
    * @param {Message} message
    */
   async execute(message) {
      if (!message.guild || message.author.bot) return;
      if (
         message.content.includes("@here") ||
         message.content.includes("@everyone")
      )
         return;
      if (!message.content.includes(message.client.user.id)) return;

      message
         .reply({
            embeds: [
               new EmbedBuilder()
                  .setColor("#6AD9F3")
                  .setTitle(`Hi, I'm ${message.client.user.username}!`)
                  .setDescription(
                     "You called me? Just type `/` & click on my command to start using me~"
                  )
                  .setThumbnail(message.client.user.displayAvatarURL())
                  .setFooter({
                     text: "This message will be automatically deleted within 10 seconds"
                  })
            ],
            components: [
               new ActionRowBuilder().addComponents(
                  new ButtonBuilder()
                     .setStyle(ButtonStyle.Link)
                     .setLabel("Official Repo")
                     .setURL("https://github.com/phucho0237/Ryuu"),

                  new ButtonBuilder()
                     .setStyle(ButtonStyle.Link)
                     .setLabel("Support Server")
                     .setURL("https://google.com")
               )
            ]
         })
         .then(msg => {
            setTimeout(() => {
               msg.delete().catch(err => console.error(err));
            }, 10000);
         });
   }
};
