export function parse(body) {
  return fetch("https://ical.that-test.site", {
    method: "POST",
    body
  })
   .then(res => res.json());
}
