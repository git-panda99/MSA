import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    MailerModule.forRoot({
      // transport: 'smtps://user@example.com:topsecret@smtp.example.com',
      // or
      transport: {
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
    }),
  ],
  providers: [MailService],
  exports: [MailService]
})
export class MailModule {}
