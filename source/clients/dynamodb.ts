import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

export const dynamodbClient = new DynamoDBClient();

export const dynamodbLibClient = DynamoDBDocumentClient.from(dynamodbClient);
