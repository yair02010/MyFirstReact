import axios from "axios";

const api = "http://localhost:8000/users";

export function checkUser(user) {
  console.log("Request URL:", `${api}?email=${user.email}&password=${user.password}`);
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
      console.error("Error checking user:", err);
      throw err;
    });
}



export function getUserById() {
  const id = JSON.parse(localStorage.getItem("userId"));
  if (!id) {
    throw new Error("User ID not found in localStorage");
  }
  return axios
    .get(`${api}/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.error("Error fetching user by ID:", err);
      throw err;
    });
}

export function addUser(user) {
  return axios
    .post(api, user)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.error("Error adding user:", err);
      throw err;
    });
}

export function checkUserExists(user) {
  return axios
    .get(`${api}?email=${user.email}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.error("Error checking if user exists:", err);
      throw err;
    });
}
