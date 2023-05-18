import { Handler } from "@netlify/functions";
import { connectDatabase } from "../../db";
import { AdvertisementModel } from "../../models/AdvertisementModel";

export const readAdvertisement: Handler = async (context, event) => {
  await connectDatabase();
  const advertisements = await AdvertisementModel.find({}).skip(0).limit(10);
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
  };

  if (advertisements) {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        advertisements: advertisements.map((adevertisement) => adevertisement),
      }),
    };
  } else {
    return { statusCode: 404, headers };
  }
};
