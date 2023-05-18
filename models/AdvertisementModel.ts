import { model, Schema } from "mongoose";

export interface Advertisement {
  name: string;
  imageURL: string;
  speciality: string;
  availability: boolean;
}

const schema = new Schema<Advertisement>({
  name: { type: String, required: true },
  imageURL: { type: String, required: true },
  speciality: { type: String, required: true },
  availability: { type: Boolean, required: true },
});

export const AdvertisementModel = model<Advertisement>(
  "advertisements",
  schema
);
