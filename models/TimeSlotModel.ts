import { model, Schema } from "mongoose";

export interface TimeSlot {
  advertisement: string;
  place: string;
  day: string;
  hour: string;
}

const schema = new Schema<TimeSlot>({
  advertisement: { type: String, required: true },
  place: { type: String, required: true },
  day: { type: String, required: true },
  hour: { type: String, required: true },
});

export const TimeSlotModel = model<TimeSlot>("timeslots", schema);
