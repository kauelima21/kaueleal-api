import { SendEmailCommand, SESClient } from '@aws-sdk/client-ses';

interface EmailData {
  subject: string;
  body: string;
  recipientEmail: string;
}

export class Email {
  private readonly client: SESClient
  private data: EmailData;

  constructor() {
    this.client = new SESClient();
  }

  public bootstrap(subject: string, body: string, recipientEmail: string) {
    this.data = {
      subject,
      body,
      recipientEmail,
    };

    return this;
  }

  public async send(from: string = process.env.MAIL_SENDER) {
    const sendEmailCommand = new SendEmailCommand({
      Source: from,
      Message: {
        Subject: {
          Charset: 'UTF-8',
          Data: this.data.subject,
        },
        Body: {
          Text: {
            Charset: 'UTF-8',
            Data: this.data.body,
          },
          Html: {
            Charset: 'UTF-8',
            Data: this.data.body,
          }
        }
      },
      Destination: {
        ToAddresses: [
          this.data.recipientEmail,
        ],
      },
    });

    await this.client.send(sendEmailCommand);
  }
}
