export default function filteredBody(body, schema) {
  const items = {};

  Object.keys(body).forEach(key => {
    if (schema.indexOf(key) >= 0) {
      items[key] = body[key];
    }
  });
  return items;
}
