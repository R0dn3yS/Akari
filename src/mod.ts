import { CommandClient, Intents, Message } from '../deps.ts';
import { config } from '../config.ts';
import { quoteCheck } from "./handlers/quote.ts";
import { nhentaiCheck } from './handlers/nhentai.ts';
import { deleteHandler } from "./handlers/delete.ts";
import { editHandler } from "./handlers/edit.ts";

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

client.connect(config.token, Intents.All);

