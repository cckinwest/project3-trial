// route to get logged in user's info (needs the token)
export const createUser = (userData) => {
  const app_id = "edad183c-31b0-4db4-82e8-348e4b67bf6a";
  const url = `https://onesignal.com/api/v1/apps/${app_id}/users`;

  return fetch(url, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify(userData),
  });
};
// make a search to google books api
// https://www.googleapis.com/books/v1/volumes?q=harry+potter
export const searchGoogleBooks = (query) => {
  return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
};
