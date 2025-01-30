import axios from "axios";
import { GetToken,GetUSerId} from "./ApiUtils";
const baseApi = "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users";
const cardsApi = "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards"
export function checkUserExists(user) {
  return axios
    .get(`${baseApi}?email=${user.email}`,{
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": GetToken()
      },
    })
    .then((res) => {
      if (Array.isArray(res.data) && res.data.length > 0) {
        return true;
      } else {
        return false;
      }
    })
    .catch((err) => {
      if (err.response?.status === 401) {
        throw new Error("Unauthorized access. Please log in.");
      }
      throw new Error("Failed to check user existence.");
    });
}

export function checkUser(user) {
  return axios
    .post(`${baseApi}/login`, {
      email: user.email,
      password: user.password,
    })
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        throw new Error("Authentication failed");
      }
    })
    .catch((err) => {
      if (err.response?.status === 401) {
        throw new Error("Invalid email or password");
      }
      throw new Error("An error occurred during login");
    });
}

export function addUser(user) {
  return axios
    .post(baseApi, user)
    .then((res) => res.data)
    .catch(() => {
      throw new Error("Failed to add user");
    });
}

export function getUserById() {
  const id = GetUSerId();
  if (!id) {
    throw new Error("User ID not found in localStorage");
  }
  return axios
    .get(`${baseApi}/${id}`,{
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": GetToken()
      },
    })
    .then((res) => res.data)
    .catch(() => {
      throw new Error("Failed to fetch user data");
    });
}

export function updateFavorites(cardId, favorites) {
  return axios
    .patch(`${cardsApi}/${cardId}`,{ },{
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": GetToken()
      }
    })
    .then((res) => res.data)
    .catch(() => {
      throw new Error("Failed to update favorites");
    });
}

export function getUserFavorites(userId) {
  const id = userId.replace(/"/g, "");
  return axios
    .get(`${baseApi}/${id}`,{
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": GetToken()
      },
    })
    .then((res) => {
      if (res.data && Array.isArray(res.data.favorites)) {
        return res.data.favorites;
      } else {
        return [];
      }
    })
    .catch(() => {
      throw new Error("Failed to fetch user favorites");
    });
}
