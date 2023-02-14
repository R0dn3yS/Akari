import { Message } from "../../deps.ts";
import { delay } from '../util.ts';

export async function quoteCheck(message: Message) {
  const year = new Date().getFullYear().toString().substring(2);
  const QUOTE_REGEX = new RegExp(`"(.+)" - <@!?(\\d{17,19})> 2k${year}`);

  if (!QUOTE_REGEX.test(message.content)) {
    message.delete();
    const msg = await message.channel.send('This message is not a valid quote!');
    await delay(2500);
    msg.delete();
  }
}