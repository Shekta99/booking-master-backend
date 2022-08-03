import { Handler } from "@netlify/functions";
import { createRestaurant } from "./createRestaurants";
import { readRestaurant } from "./readRestaurants";

const handler: Handler = (event, context, callback) => {
  switch (event.httpMethod) {
    case "GET":
      return readRestaurant(event, context, callback);
    case "POST":
      return createRestaurant(event, context, callback);
    default:
      return new Promise((resolve) => {
        resolve({ statusCode: 501 });
      });
  }
};

export { handler };
