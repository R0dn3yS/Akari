import { Command, CommandContext, Embed } from '../../../deps.ts';

export default class HelpCommand extends Command {
  name = 'help';
  aliases = [ 'h' ];
  category = 'util';
  description = 'Display this help message';
  usage = '';
  execute(ctx: CommandContext) {
    const helpEmbed = new Embed()
      .setFooter('Arguments: (optional) [required]', ctx.client.user!.avatarURL())
      .setColor('GREEN')
      .setTitle(`${ctx.client.user!.username} commands:`);
    
    for (const command of ctx.client.commands.list) {
      helpEmbed.addField(`${ctx.client.prefix}${command[1].name} ${command[1].usage}`, command[1].description as string);
    }

    ctx.channel.send(helpEmbed);
  } 
}