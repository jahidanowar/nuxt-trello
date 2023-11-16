import { Document, Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import { generateHash } from "~/utils/hash";
import Stripe from "stripe";

export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  stripeCustomerId?: string;
  subscription: {
    id: string;
    status: string;
    priceId: string;
  };
  hasActiveSubscription: boolean;
  comparePassword: (password: string) => Promise<boolean>;
  updateSubscription: (data: Stripe.Subscription) => Promise<void>;
}

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email already exists"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    stripeCustomerId: {
      type: String,
      default: null,
    },
    subscription: {
      id: {
        type: String,
        default: null,
      },
      status: {
        type: String,
        default: null,
      },
      priceId: {
        type: String,
        default: null,
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await generateHash(this.password);

  next();
});

userSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.updateSubscription = async function (
  data: Stripe.Subscription
) {
  this.subscription.id = data.id;
  this.subscription.status = data.status;
  this.subscription.priceId = data.items.data[0].price.id;

  await this.save();
};

userSchema.virtual("hasActiveSubscription").get(function (this: UserDocument) {
  const allowedStatuses = ["active", "trialing"];

  return allowedStatuses.includes(this.subscription.status);
});

export const User = model<UserDocument>("User", userSchema);
