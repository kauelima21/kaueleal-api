import { DynamoDBStreamEvent } from 'aws-lambda';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import { AttributeValue } from '@aws-sdk/client-dynamodb';
import { Email } from '../support/email';

export function handler(event: DynamoDBStreamEvent) {
  event.Records.map(async (record) => {
    if (record.eventName === 'INSERT') {
      const messageData = unmarshall(record.dynamodb.NewImage as Record<string, AttributeValue>);

      const email = new Email();
      await email.bootstrap(
          `[kaueleal.dev] - Nova mensagem de ${messageData.name} - ${messageData.email}`,
          messageData.message,
          'kaueslim@gmail.com'
        ).send();
    }
  });
}
