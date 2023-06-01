import { Handler } from "@netlify/functions";
import { registerUser } from "./register";
import { signin } from "./signin";

const handler: Handler = (event, context, callback) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
  };
  switch (event.httpMethod) {
    case "PUT":
      return signin(event, context, callback);
    case "POST":
      return registerUser(event, context, callback);
    case "OPTIONS":
      const allowCors: Handler = async (context, event) => {
        return { statusCode: 200, headers };
      };
      return allowCors(event, context, callback);
    default:
      return new Promise((resolve) => {
        resolve({ statusCode: 501 });
      });
  }
};

export { handler };
