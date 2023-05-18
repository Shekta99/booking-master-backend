import { Handler } from "@netlify/functions";
import { connectDatabase } from "../../db";
import { TimeSlotModel } from "../../models/TimeSlotModel";

export const readTimeSlot: Handler = async (context, event) => {
  await connectDatabase();
  const timeSlots = await TimeSlotModel.find({}).skip(0).limit(10);
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
  };

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
};
