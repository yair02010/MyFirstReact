import axios from "axios";

const api = "http://localhost:8000/cards";

export function getAllCards() {
  return axios.get(api).then((res) => res.data);
}

export function getCardById(id) {
  return axios.get(`${api}/${id}`).then((res) => res.data);
}

export function createCard(card) {
  const userId = localStorage.getItem("userId")?.replace(/"/g, "");
  return axios.post(api, { ...card, ownerId: userId });
}

export function updateCard(card) {
  const cleanedOwnerId = card.ownerId?.replace(/"/g, "");
  const updatedCard = { ...card, ownerId: cleanedOwnerId };
  return axios.put(`${api}/${card.id}`, updatedCard).then((res) => res.data);
}

export function deleteCard(id) {
  return axios.delete(`${api}/${id}`);
}
