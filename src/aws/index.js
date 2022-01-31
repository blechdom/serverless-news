const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Headers" : "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
    "Access-Control-Allow-Methods" : "*",
    "Access-Control-Allow-Credentials" : true,
    "Access-Control-Allow-Origin" : "*",
    "X-Requested-With" : "*"
  };

  try {
    switch (event.routeKey) {
      case "DELETE /article/{id}":
        await dynamo
          .delete({
            TableName: "Articles",
            Key: {
              id: event.pathParameters.id
            }
          })
          .promise();
        body = `Deleted article ${event.pathParameters.id}`;
        break;
      case "GET /article/{id}":
        body = await dynamo
          .get({
            TableName: "Articles",
            Key: {
              id: event.pathParameters.id
            }
          })
          .promise();
        break;
      case "GET /articles":
        body = await dynamo.scan({ TableName: "Articles" }).promise();
        break;
      case "PUT /article":
        let requestJSON = JSON.parse(event.body);
        await dynamo
          .put({
            TableName: "Articles",
            Item: {
              id: requestJSON.id,
              date: requestJSON.date,
              title: requestJSON.title,
              description: requestJSON.description,
              image: requestJSON.image,
              viewed: requestJSON.viewed
            }
          })
          .promise();
        body = `Put article ${requestJSON.id}`;
        break;
      case "GET /login/{email}":
        body = await dynamo
          .get({
            TableName: "Login",
            Key: {
              email: event.pathParameters.email
            }
          })
          .promise();
        break;
      default:
        throw new Error(`Unsupported route: "${event.routeKey}"`);
    }
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers
  };
};