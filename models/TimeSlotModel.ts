import { model, Schema } from "mongoose";

export interface TimeSlot {
  place: string;
  day: string;
  hour: string;
}

const schema = new Schema<TimeSlot>({
  place: { type: String, required: true },
  day: { type: String, required: true },
  hour: { type: String, required: true },
});

export const TimeSlotModel = model<TimeSlot>("timeSlots", schema);
