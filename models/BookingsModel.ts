import { model, Schema } from "mongoose";

export interface Booking {
  advertisement: string;
  user: string;
  place: string;
  date: string;
  hour: string;
}

const schema = new Schema<Booking>({
  advertisement: { type: String, required: true },
  user: { type: String, required: true },
  place: { type: String, required: true },
  date: { type: String, required: true },
  hour: { type: String, required: true },
});

export const BookingModel = model<Booking>("bookings", schema);
