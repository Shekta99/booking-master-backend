import { Handler } from "@netlify/functions";
import { createTimeSlot } from "./createTimeSlot";
import { readTimeSlot } from "./readTimeSlot";

const handler: Handler = (event, context, callback) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
  };
  switch (event.httpMethod) {
    case "PUT":
      return readTimeSlot(event, context, callback);
    case "POST":
      return createTimeSlot(event, context, callback);
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
