import axios from "axios";

const api = "http://localhost:8000/cards";

export function getAllCards() {
return axios
    .get(api)
    .then((res) => {
    return res.data;
    })
    .catch((err) => {
      console.error("Error fetching cards:", err); 
      throw err; 
    });
}
