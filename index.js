addEventListener("fetch", (event) => {
    const response = new Response("Hello World! Check", {
      headers: { "content-type": "text/plain" },
    });
    event.respondWith(response);
  });