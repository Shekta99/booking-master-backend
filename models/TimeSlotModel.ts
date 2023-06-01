import { model, Schema } from "mongoose";

export interface TimeSlot {
  advertisement: string;
  place: string;
  date: string;
  hour: string;
  availability: boolean;
}

const schema = new Schema<TimeSlot>({
  advertisement: { type: String, required: true },
  place: { type: String, required: true },
  date: { type: String, required: true },
  hour: { type: String, required: true },
  availability: { type: Boolean, required: true },
});

export const TimeSlotModel = model<TimeSlot>("timeslots", schema);
