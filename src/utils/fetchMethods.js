export const postData = (url, data) => {
  const response = fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  const result = response.json();

  return result;
};
