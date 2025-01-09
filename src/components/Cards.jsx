import { useEffect, useState } from "react";
import { getAllCards } from "../services/CardsService";
import { getUserById, updateFavorites, getUserFavorites } from "../services/UserService";
import Navbar from "./NavBar";
import "../css/Cards.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faSolidHeart } from "@fortawesome/free-solid-svg-icons";

function Cards() {
  const [cards, setCards] = useState([]);
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem("userId")?.replace(/"/g, ""); // הסרת גרשיים מיותרים
        if (!userId) {
          setError("Please log in to view the cards.");
          return;
        }

        const userData = await getUserById();
        setUser(userData);

        const userFavorites = await getUserFavorites(userId);
        setFavorites(userFavorites);

        const allCards = await getAllCards();
        const updatedCards = allCards.map((card) => ({
          ...card,
          isFavorite: userFavorites.includes(card.id),
        }));

        setCards(updatedCards);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load cards. Please try again later.");
      }
    };

    fetchData();
  }, []);

  const handleFavoriteClick = async (cardId) => {
    if (!user) {
      alert("Please log in to add to favorites");
      return;
    }

    try {
      const updatedFavorites = favorites.includes(cardId)
        ? favorites.filter((id) => id !== cardId)
        : [...favorites, cardId];

      setFavorites(updatedFavorites);
      await updateFavorites(user.id, updatedFavorites);

      setCards((prevCards) =>
        prevCards.map((card) =>
          card.id === cardId ? { ...card, isFavorite: !card.isFavorite } : card
        )
      );
    } catch (err) {
      console.error("Error updating favorites:", err);
      alert("Failed to update favorites. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="cards-container">
        <h4 className="cards-header">Cards</h4>
        {error && <p className="text-danger">{error}</p>}
        <div className="cards-grid">
          {cards.map((card) => (
            <div className="card" key={card.id}>
              <img
                className="card-img-top"
                src={card.ImageUrl || "path/to/default-image.jpg"}
                alt={card.ImageAlt || "Card image"}
              />
              <div className="card-body">
                <h5 className="card-title">{card.Title}</h5>
                <p className="card-text">{card.Description}</p>
                <FontAwesomeIcon
                  icon={card.isFavorite ? faSolidHeart : faRegularHeart}
                  style={{
                    cursor: "pointer",
                    color: card.isFavorite ? "red" : "gray",
                  }}
                  onClick={() => handleFavoriteClick(card.id)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Cards;
