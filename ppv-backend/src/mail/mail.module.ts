import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        // transport: config.get("MAIL_TRANSPORT"),
        // or
        transport: {
          host: config.get('MAIL_HOST'),
          port: config.get('MAIL_PORT'),
          secure: true,
          auth: {
            user: config.get('MAIL_USER'),
            pass: config.get('MAIL_PASSWORD'),
          },
        },
        defaults: {
          from: `"No Reply" <${config.get('MAIL_FROM')}>`,
        },
        template: {
          dir: __dirname + '/templates',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
      // transport: 'smtps://user@example.com:topsecret@smtp.example.com',
      // or
      /*transport: {
        host: 'mail.bpstream.ro',
        port: 465,
        secure: true,
        auth: {
          user: 'noreply@bpstream.ro',
          pass: ',=hp9vQ4FWj7',
        },
      },
      defaults: {
        from: '"No Reply" <noreply@bpstream.ro>',
      },
      template: {
        dir:  __dirname + "/templates",
        adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: true,
        },
      },
    }),*/
  ],
  providers: [MailService],
  exports: [MailService]
})
export class MailModule {}
