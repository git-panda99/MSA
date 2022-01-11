import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Event } from 'src/events/events.entity';
import { Ticket } from 'src/tickets/ticket.entity';
import { User } from 'src/users/user.entity';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) {}

    async sendUserConfirmation(user: User, token: string) {
        const url = `localhost:8100/confirm/${token}`;
        console.log(user.firstName);

        await this.mailerService.sendMail({
          to: user.email,
          // from: '"Support Team" <support@example.com>', // override default from
          subject: 'Thank you for Registering! Confirm your Email',
          template: 'templates/confirmation.hbs', // `.hbs` extension is appended automatically
          context: { // ✏️ filling curly brackets with content
            firstName: user.firstName,
            url,
            image: 'https://bpstream.ro/img/undraw_Envelope_re_f5j4.png',
          },
        })
        .then((success) => {
          console.log(success)
        })
        .catch((err) => {
          console.log(err)
        });
      }

      async sendTicketConfirmation(user: User, event: Event) {
        await this.mailerService.sendMail({
          to: user.email,
          // from: '"Support Team" <support@example.com>', // override default from
          subject: 'Bought ticket. PPV App',
          template: 'templates/buy_ticket.hbs', // `.hbs` extension is appended automatically
          context: { // ✏️ filling curly brackets with content
            firstName: user.firstName,
            purchaseData: Date(),
            event: event.title,
            eventDate: event.beginDate,
            url: 'http://localhost:8100/tabs/event/'+event.id,
            image: 'https://bpstream.ro/img/undraw_printing_invoices_5r4r.png',
          },
        })
        .then((success) => {
          console.log(success)
        })
        .catch((err) => {
          console.log(err)
        });
      }
}
