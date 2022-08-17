import { Handler } from "@netlify/functions";
import { connectDatabase } from "../../db";
import { IngredientModel } from "../../models/IngredientModel";

export const readIngredient: Handler = async (context, event) => {
  await connectDatabase();
  const ingredients = await IngredientModel.find({}).skip(0).limit(10);
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
  };

  if (ingredients) {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        ingredients: ingredients.map((ingredient) => ingredient),
      }),
    };
  } else {
    return { statusCode: 404, headers };
  }
};
