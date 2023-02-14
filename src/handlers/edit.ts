import { CommandClient,Embed,GuildTextBasedChannel,Message } from "../../deps.ts";

export async function editHandler(client: CommandClient, oldMessage: Message, newMessage: Message) {
  if (oldMessage.content === newMessage.content) return;
  if (oldMessage.content.length + newMessage.content.length > 1000) return;

  const eLog = await oldMessage.guild!.channels.resolve('790792385889566751') as GuildTextBasedChannel;

  const eEmbed = new Embed()
    .setThumbnail(oldMessage.author.avatarURL())
    .setFooter(client.user!.username, client.user!.avatarURL())
    .setColor('#FFA500')
    .addField('Edited Message', `**> User:** ${oldMessage.author}
		**> Edited in:** ${oldMessage.channel}
		**> Old message:** ${oldMessage.content}
		**> New message:** ${newMessage.content}`)
    .setTimestamp(Date.now());

  eLog.send(eEmbed);
}