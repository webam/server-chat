import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts"

const messages = [];
const channel = new BroadcastChannel("chat");
// Set onmessage event handler.
channel.onmessage = (event) => {
  // Update the local state when other instances
  // send us a new message.
  messages.push(event.data);
};

const router = new Router();
router
  .get("/", (context) => {
    context.response.body = "Chat server!";
  })
  .get("/messages", (context) => {
    context.response.body = messages;
  })
  .post("/messages", async (context) => {
    const message = await context.request.body().value;
    messages.push(message);
    channel.postMessage(message);
    context.response.body = messages;
  });

const app = new Application();
app.use(oakCors())
app.use(router.routes());
app.use(router.allowedMethods());


addEventListener("fetch", app.fetchEventHandler());

// await app.listen({ port: 8000 });
