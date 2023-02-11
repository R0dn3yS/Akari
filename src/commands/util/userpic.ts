import { Command, CommandContext } from '../../../deps.ts';
import type { Args, User } from '../../../deps.ts';

export default class UserpicCommand extends Command {
  name = 'userpic';
  aliases = [ 'pfp', 'userpicture' ];
  category = 'util';
  description = 'Returns the picture of the specified user';
  usage = '(user)';
  optionalArgs = true;
  args: Args[] = [
    {
      name: 'user',
      match: 'user',
    },
  ];
  execute(ctx: CommandContext) {
    let user: User;

    if (!ctx.args!.user) {
      user = ctx.author;
    } else {
      user = ctx.args!.user as User;
    }

    ctx.channel.send(user.avatarURL('dynamic'));
  }
}