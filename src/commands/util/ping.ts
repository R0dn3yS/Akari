import { Command, CommandContext } from "../../../deps.ts";

export default class PingCommand extends Command {
  name = 'ping';
  category = 'util';
  description = 'Returns latency of the bot';
  usage = '';
  execute(ctx: CommandContext) {
    ctx.channel.send('pinging...').then((m) => {
      m.edit(`Latency is ${ctx.client.gateway.ping}ms`);
    });
  }
}