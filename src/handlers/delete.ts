import { CommandClient, Embed, GuildTextBasedChannel, Message } from "../../deps.ts";

export async function deleteHandler(client: CommandClient, message: Message) {
  if (message.content.length > 1000) return;

  const dLog = await message.guild!.channels.resolve('790787179663196191') as GuildTextBasedChannel;

  const dEmbed = new Embed()
    .setThumbnail(message.author.avatarURL())
    .setFooter(client.user!.username, client.user!.avatarURL())
    .setColor('#FFA500')
    .addField('Deleted Message', `**> User:** ${message.author}
    **> Deleted in: ** ${message.channel}
    **> Message: ** ${message.content}`)
    .setTimestamp(Date.now());

  return dLog.send(dEmbed);
}