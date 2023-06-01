import { Handler } from "@netlify/functions";
import { connectDatabase } from "../../db";
import { UserModel } from "../../models/UserModel";

export const registerUser: Handler = async (context, event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "X-Requested-With",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
  };
  try {
    if (context.headers["content-type"] !== "application/json") {
      return {
        statusCode: 400,
        headers,
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
      "password" in parsedBody &&
      "rol" in parsedBody
    ) {
      await connectDatabase();

      const newUser = new UserModel({
        name: parsedBody.name,
        password: parsedBody.password,
        rol: parsedBody.rol,
      });

      await newUser.save();

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          user: newUser,
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
      headers,
      body: JSON.stringify({
        error,
      }),
    };
  }
};
