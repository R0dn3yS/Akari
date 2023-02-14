import { Message } from "https://code.harmony.rocks/v2.8.0/mod.ts";

export function nhentaiCheck(message: Message) {
  if (message.content.startsWith('[') && message.content.endsWith(']')) {
    const digits = message.content.substring(1, message.content.length - 1);

    if (parseInt(digits).toString() === digits) {
      message.channel.send(`https://nhentai.net/g/${digits}`);
    }
  }
}