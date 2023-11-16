import { Document, Schema, model } from "mongoose";

export interface CardDocument extends Document {
  title: string;
  description: string;
  owner: string;
  list: string;
}

const cardSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      default: null,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Owner is required"],
    },
    list: {
      type: Schema.Types.ObjectId,
      ref: "List",
      required: [true, "List is required"],
    },
  },
  {
    timestamps: true,
  }
);

export const Card = model<CardDocument>("Card", cardSchema);
