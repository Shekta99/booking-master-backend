import { Handler } from "@netlify/functions";
import { connectDatabase } from "../../db";
import { RestaurantModel } from "../../models/RestaurantModel";

export const readRestaurant: Handler = async (context, event) => {
  await connectDatabase();
  const restaurants = await RestaurantModel.find({}).skip(0).limit(10);

  if (restaurants) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        restaurants: {
          restaurant: restaurants.map((restaurant) => restaurant),
        },
      }),
    };
  } else {
    return { statusCode: 404 };
  }
};
