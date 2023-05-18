import { model, Schema } from "mongoose";

export interface Advertisement {
  name: string;
  imageURL: string;
  speciality: string;
}

const schema = new Schema<Advertisement>({
  name: { type: String, required: true },
  imageURL: { type: String, required: true },
  speciality: { type: String, required: true },
});

export const AdvertisementModel = model<Advertisement>(
  "advertisements",
  schema
);
