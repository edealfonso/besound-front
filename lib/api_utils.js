export function processMedia(data) {
  const maxId = data.reduce(
      (accumulated, value) =>
          (accumulated = accumulated > value.id ? accumulated : value.id),
      0
  );
  var processed = new Array(maxId + 1);
  data.forEach((item) => {
      processed[item.id] = item;
  });
  return processed;
}

export function buildFeaturedArray(data) {
  let array = [];
  for (const post of data) {
      array.push(post.id);
  }
  return array;
}

export function getCategoryById(id, categories) {
  for (const category of categories) {
      if (category.id == id) return category;
  }
  return '';
}

export function getCategoryBySlug(slug, categories) {
  for (const category of categories) {
      if (category.slug == slug) return category;
  }
  return '';
}
