import { Handler } from "@netlify/functions";
import { connectDatabase } from "../../db";
import { BookingModel } from "../../models/BookingsModel";

export const createBooking: Handler = async (context, event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
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
      "advertisement" in parsedBody &&
      "user" in parsedBody &&
      "place" in parsedBody &&
      "date" in parsedBody &&
      "hour" in parsedBody
    ) {
      await connectDatabase();

      const newBooking = new BookingModel({
        advertisement: parsedBody.advertisement,
        place: parsedBody.place,
        date: parsedBody.date,
        hour: parsedBody.hour,
        user: parsedBody.user,
      });

      await newBooking.save();

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          bookings: newBooking,
        }),
      };
    } else {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: "Invalid input, place, date and hour are required",
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
