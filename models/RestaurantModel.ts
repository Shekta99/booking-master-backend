import { model, Schema } from "mongoose";

export interface Restaurant {
  name: string;
  imageURL: string;
  speciality: string;
}

const schema = new Schema<Restaurant>({
  name: { type: String, required: true },
  imageURL: { type: String, required: true },
  speciality: { type: String, required: true },
});

export const RestaurantModel = model<Restaurant>("restaurants", schema);
