const headers = {
  "Access-Control-Allow-Origin": "http://localhost:8080",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json"
};

addEventListener("fetch", event => {
  event.respondWith(handle(event.request));
});

async function handle(request) {
  try {
    const data = await request.text();
    const rust = await import("../crate/pkg");
    const res = rust.parse2(data);
    return new Response(JSON.stringify(res), { headers });
  } catch (err) {
    return new Response(JSON.stringify(err), { headers });
  }
}
