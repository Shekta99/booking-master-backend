import { Handler } from "@netlify/functions";
import { connectDatabase } from "../../db";
import { TimeSlotModel } from "../../models/TimeSlotModel";

export const readTimeSlot: Handler = async (context, event) => {
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

    if (parsedBody && "advertisement" in parsedBody) {
      await connectDatabase();

      const timeSlots = await TimeSlotModel.find({
        advertisement: parsedBody.advertisement,
      })
        .skip(0)
        .limit(10);

      if (timeSlots) {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            timeSlots: timeSlots.map((timeSlot) => timeSlot),
          }),
        };
      } else {
        return { statusCode: 404, headers };
      }
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Invalid input advertisement id is required",
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
