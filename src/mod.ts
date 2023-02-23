import { CommandClient, Intents, Member, Message, VoiceChannel } from '../deps.ts';
import { config } from '../config.ts';
import { quoteCheck } from "./handlers/quote.ts";
import { nhentaiCheck } from './handlers/nhentai.ts';
import { deleteHandler } from "./handlers/delete.ts";
import { editHandler } from "./handlers/edit.ts";

let memberCount: number;
let countChannel: VoiceChannel;

const client = new CommandClient({
  prefix: '\\',
  owners: config.owners,
});

client.once('ready', async () => {
  console.log(`${client.user!.username} is ready on ${await client.guilds.size()} servers!`);

  client.setPresence({
    name: 'over you',
    type: 'WATCHING',
  });

  countChannel = await client.channels.resolve('947819208518008874') as VoiceChannel;
  memberCount = await countChannel.guild.memberCount!;
  console.log(`Guild has ${memberCount} members`);
  await countChannel.edit({ name: `Members: ${memberCount}` });
});

client.commands.loader.loadDirectory('src/commands', { maxDepth: 2 });

client.on('messageCreate', async (message: Message) => {
  if (message.author.bot) return;

  if (message.channelID === '789201783901650975') return await quoteCheck(message);
  nhentaiCheck(message);
});

client.on('messageDelete', async (message: Message) => {
  if (message.channelID !== '789201783901650975') await deleteHandler(client, message);
});

client.on('messageUpdate', async (oldMessage: Message, newMessage: Message) => {
  await editHandler(client, oldMessage, newMessage);
});

client.on('guildMemberAdd', async (_member: Member) => {
  memberCount += 1;
  await countChannel.edit({ name: `Members: ${memberCount}` });
});

client.on('guildMemberRemove', async (_member: Member) => {
  memberCount -= 1;
  await countChannel.edit({ name: `Members: ${memberCount}` });
});

client.connect(config.token, Intents.All);

