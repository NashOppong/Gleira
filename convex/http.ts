import { httpRouter } from "convex/server";
import { Webhook } from "svix";
import { api } from "./_generated/api";
import { httpAction } from "./_generated/server";

const http = httpRouter();

http.route({
  path: "/clerk-webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
    if (!webhookSecret) {
      throw new Error("CLERK_WEBHOOK_SECRET is not set");
    }
    //CHECK HEADERS
    const svix_signature = request.headers.get("svix-signature");
    const svix_timestamp = request.headers.get("svix-timestamp");
    const svix_id = request.headers.get("svix-id");
    if (!svix_signature || !svix_timestamp || !svix_id) {
      return new Response("Missing headers", { status: 400 });
    }

    const payload = await request.json();
    const body = JSON.stringify(payload);

    const wh = new Webhook(webhookSecret);
    let evt: any;
    try {
      evt = wh.verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      });
    } catch (e) {
      console.error("ERROR", e);
      return new Response("Invalid signature", { status: 400 });
    }

    const eventType = evt.type;

    if (eventType === "user.created") {
      const { id, email_addresses, first_name, last_name, image_url } =
        evt.data;
      const email = email_addresses?.[0]?.email_address;

      const Name = `${first_name || ""} ${last_name || ""}`.trim();

      try {
        await ctx.runMutation(api.users.createUser, {
          clerkId: id,
          email,
          fullname: Name,
          image: image_url,
          username: email.split("@")[0],
        });
      } catch (error) {
        console.error("Error", error);
        return new Response("Error creating User", { status: 500 });
      }

      return new Response("Webhook processed successfully", { status: 200 });
    }

    // ✅ Add a default response so every request returns something
    return new Response("Unhandled event type", { status: 200 });
  }),
}); // ✅ properly closed route and handler

export default http;
