import { Handler } from "@netlify/functions";
import { connectDatabase } from "../../db";
import { UserModel } from "../../models/UserModel";

export const signin: Handler = async (context, event) => {
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

    if (parsedBody && "name" in parsedBody && "password" in parsedBody) {
      await connectDatabase();

      const user = await UserModel.find({
        name: parsedBody.name,
        password: parsedBody.password,
      })
        .skip(0)
        .limit(10);

      if (user) {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            user: user.map((user) => user),
          }),
        };
      } else {
        return { statusCode: 404, headers };
      }
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Invalid input name or password is incorrect",
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
