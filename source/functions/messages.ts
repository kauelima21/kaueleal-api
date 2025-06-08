import { APIGatewayProxyEventV2 } from 'aws-lambda';
import { httpResponse } from '../support/utils';
import { z } from 'zod';
import { dynamodbLibClient } from '../clients/dynamodb';
import { Message } from '../models/message';

export async function postHandler(event: APIGatewayProxyEventV2) {
  const schema = z.object({
    name: z.string().min(3).max(128),
    email: z.string().email(),
    message: z.string().min(3).max(255),
  });

  const body = JSON.parse(event.body || '{}');

  const { success, data, error } = schema.safeParse(body);

  if (!success) {
    return httpResponse(400, { error: error.message });
  }

  const message = new Message(dynamodbLibClient);
  message.name = data.name;
  message.email = data.email;
  message.message = data.message;

  await message.save();

  return httpResponse(201);
}
