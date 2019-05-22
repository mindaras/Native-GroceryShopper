export default (endpoint, method, body) => {
  return fetch(endpoint, { method, body: body && JSON.stringify(body) }).then(
    response => response.json()
  );
};
