import { APIGatewayProxyResultV2 } from 'aws-lambda';

const allowedOrigins = ['http://localhost:5173', 'https://www.kaueleal.dev'];

export function httpResponse(statusCode: number, body?: Record<string, unknown>): APIGatewayProxyResultV2 {
  return {
    statusCode,
    body: body ? JSON.stringify(body) : null,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
      'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
      'Access-Control-Allow-Origin': '*'
    },
  }
}
