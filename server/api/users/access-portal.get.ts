import stripe from "~/utils/stripe";

export default defineEventHandler(async (event) => {
  const user = event.context.user;
  const config = useRuntimeConfig();

  if (!user.stripeCustomerId) {
    throw createError({
      statusCode: 400,
      message: "User needs to subscribe first",
    });
  }

  const portal = await stripe().billingPortal.sessions.create({
    customer: user.stripeCustomerId,
    return_url: config.auth.origin,
  });

  return portal.url;
});
