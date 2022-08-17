import { model, Schema } from "mongoose";

export interface Ingredient {
  name: string;
  imageURL: string;
  kind: string;
}

const schema = new Schema<Ingredient>({
  name: { type: String, required: true },
  imageURL: { type: String, required: true },
  kind: { type: String, required: true },
});

export const IngredientModel = model<Ingredient>("ingredients", schema);
