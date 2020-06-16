const USERS_URL = "http://localhost:3001/users";

const getUsers = () => fetch(USERS_URL).then((res) => res.json());

const postUser = (user) =>
  fetch(USERS_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => res.json());

const patchUser = (id,user) =>
  fetch(`${USERS_URL}/${id}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => res.json());

  
export default {
  getUsers,
  postUser,
  patchUser,
};