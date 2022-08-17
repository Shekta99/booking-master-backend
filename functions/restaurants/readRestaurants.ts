import { Handler } from "@netlify/functions";
import { connectDatabase } from "../../db";
import { RestaurantModel } from "../../models/RestaurantModel";

export const readRestaurant: Handler = async (context, event) => {
  await connectDatabase();
  const restaurants = await RestaurantModel.find({}).skip(0).limit(10);
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
  };

  if (restaurants) {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        restaurants: restaurants.map((restaurant) => restaurant),
      }),
    };
  } else {
    return { statusCode: 404, headers };
  }
};
