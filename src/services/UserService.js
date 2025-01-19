import axios from "axios";

const api = "http://localhost:8000/users";

export function checkUser(user) {
  return axios
    .get(`${api}?email=${user.email}&password=${user.password}`)
    .then((res) => {
      if (Array.isArray(res.data) && res.data.length > 0) {
        return res.data[0];
      } else {
        throw new Error("User not found");
      }
    })
    .catch((err) => {
      throw err;
    });
}

export function getUserById() {
  const id = localStorage.getItem("userId")?.replace(/"/g, "");
  if (!id) {
    throw new Error("User ID not found in localStorage");
  }
  return axios
    .get(`${api}/${id}`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

export function addUser(user) {
  return axios
    .post(api, user)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

export function checkUserExists(user) {
  return axios
    .get(`${api}?email=${user.email}`)
    .then((res) => {
      if (Array.isArray(res.data) && res.data.length > 0) {
        return true;
      } else {
        return false;
      }
    })
    .catch((err) => {
      throw err;
    });
}

export function updateFavorites(userId, favorites) {
  return axios
    .patch(`${api}/${userId}`, { favorites })
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

export function getUserFavorites(userId) {
  const id = userId.replace(/"/g, "");
  return axios
    .get(`${api}/${id}`)
    .then((res) => {
      if (res.data && Array.isArray(res.data.favorites)) {
        return res.data.favorites;
      } else {
        return [];
      }
    })
    .catch((err) => {
      throw err;
    });
}
