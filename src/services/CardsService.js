import axios from "axios";
import { GetToken,GetUSerId} from "./ApiUtils";

const api = "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards";

export function getAllCards() {
  return axios.get(api,{
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": GetToken()
        },
      }).then((res) => res.data);
}

export function getMyCards() {
  return axios.get(`${api}/my-cards`,{
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": GetToken()
        },
      }).then((res) => res.data);
}

export function getCardById(id) {
  return axios.get(`${api}/${id}`,{
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": GetToken()
        },
      }).then((res) => res.data);
}

export function createCard(card) {
  card.user_id = GetUSerId();
  return axios.post(api, card,{
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": GetToken()
        }});
}

export function updateCard(card) {
  const cleanedOwnerId = card.ownerId?.replace(/"/g, "");
  const updatedCard = { ...card, ownerId: cleanedOwnerId };
  return axios.put(`${api}/${card.id}`, updatedCard).then((res) => res.data);
}

export function deleteCard(id) {
  return axios.delete(`${api}/${id}`,{
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": GetToken()
        },
      });
}
