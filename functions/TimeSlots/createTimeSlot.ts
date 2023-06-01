import { Handler } from "@netlify/functions";
import { connectDatabase } from "../../db";
import { TimeSlotModel } from "../../models/TimeSlotModel";

export const createTimeSlot: Handler = async (context, event) => {
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
      "park" in parsedBody &&
      "place" in parsedBody &&
      "date" in parsedBody &&
      "hour" in parsedBody &&
      "availability" in parsedBody
    ) {
      await connectDatabase();

      const newTimeSlot = new TimeSlotModel({
        park: parsedBody.park,
        place: parsedBody.place,
        date: parsedBody.date,
        hour: parsedBody.hour,
        availability: parsedBody.availability,
      });

      await newTimeSlot.save();

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          restaurant: newTimeSlot,
        }),
      };
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Invalid input, place, day and hour are required",
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
