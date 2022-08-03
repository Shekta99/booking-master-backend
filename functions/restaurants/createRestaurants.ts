import { Handler } from "@netlify/functions";
import { connectDatabase } from "../../db";
import { RestaurantModel } from "../../models/RestaurantModel";

export const createRestaurant: Handler = async (context, event) => {
  try {
    if (context.headers["content-type"] !== "application/json") {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Invalid content type, expected application/json",
        }),
      };
    }

    const { body } = context;
    const parsedBody = body && body.length > 0 ? JSON.parse(body) : null;

    if (
      parsedBody &&
      "name" in parsedBody &&
      "imageURL" in parsedBody &&
      "speciality" in parsedBody
    ) {
      await connectDatabase();

      const newRestaurant = new RestaurantModel({
        name: parsedBody.name,
        imageURL: parsedBody.imageURL,
        speciality: parsedBody.speciality,
      });

      await newRestaurant.save();

      return {
        statusCode: 200,
        body: JSON.stringify({
          restaurant: newRestaurant,
        }),
      };
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Invalid input, name, imageURL and specility are required",
        }),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error,
      }),
    };
  }
};
