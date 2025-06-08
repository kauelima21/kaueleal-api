import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { randomUUID } from 'node:crypto';

export class Message {
  public name: string;
  public email: string;
  public message: string;

  constructor(private readonly client: DynamoDBDocumentClient) {}

  public async save() {
    const putCommand = new PutCommand({
      TableName: process.env.MESSAGES_TABLE,
      Item: {
        id: randomUUID(),
        name: this.name,
        email: this.email,
        message: this.message,
      }
    });

    await this.client.send(putCommand);
  }
}
