import Stripe from "stripe";

export default () => {
  const config = useRuntimeConfig();

  if (!config.stripeSecretKey) {
    throw createError({
      statusCode: 500,
      message: "Stripe secret key not found",
    });
  }

  const stripe = new Stripe(config.stripeSecretKey, {
    apiVersion: "2023-10-16",
  });

  return stripe;
};
