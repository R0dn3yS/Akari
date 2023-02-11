import { Command, CommandContext } from '../../../deps.ts';

export default class ServerPictureCommand extends Command {
  name = 'serverpic';
  aliases = [ 'serverpicture', 'sp' ];
  category = 'util';
  description = 'Returns the server icon';
  usage = '';
  execute(ctx: CommandContext) {
    ctx.channel.send(ctx.guild?.iconURL());
  }
}