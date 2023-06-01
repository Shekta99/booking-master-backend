import { Handler } from "@netlify/functions";
import { connectDatabase } from "../../db";
import { BookingModel } from "../../models/BookingsModel";

export const readBookings: Handler = async (context, event) => {
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

    if (parsedBody && "user" in parsedBody) {
      await connectDatabase();

      const bookings = await BookingModel.find({
        user: parsedBody.user,
      })
        .skip(0)
        .limit(10);

      if (bookings) {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            bookings: bookings.map((booking) => booking),
          }),
        };
      } else {
        return { statusCode: 200, body: "no bookings found", headers };
      }
    } else {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: "Invalid input user is required",
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
