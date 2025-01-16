import { useEffect, useState } from "react";
import Navbar from "./NavBar";
import "../css/Cards.css";
import { getUserFavorites, getUserById } from "../services/UserService";
import { getAllCards } from "../services/CardsService";
import Footer from "./Fotter";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import("../css/favcards.css")
function Favorites() {
  const [favoriteCards, setFavoriteCards] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          setError("Please log in to view favorite cards.");
          return;
        }

        const favorites = await getUserFavorites(userId);
        const allCards = await getAllCards();
        const filteredCards = allCards.filter((card) => favorites.includes(card.id));

        setFavoriteCards(filteredCards);
      } catch (err) {
        console.error("Error fetching favorite cards:", err);
        setError("Failed to load favorite cards.");
      }
    };

    fetchFavorites();
  }, []);

  return (
    <>
      <Navbar />
      <div className="favorites-container">
        <h4 className="favorites-header">Favorite Cards</h4>
        {error && <p className="favorites-error">{error}</p>}
        <div className="favorites-grid">
          {favoriteCards.length > 0 ? (
            favoriteCards.map((card) => (
              <div className="favorites-card" key={card.id}>
                <img
                  className="favorites-card-img"
                  src={card.ImageUrl }
                  alt={card.ImageAlt }
                />
                <div className="favorites-card-body">
                  <h5 className="favorites-card-title">{card.Title}</h5>
                  <p className="favorites-card-text">{card.Description}</p>
                  <button
                className="btn btn-primary"
                onClick={() => navigate(`/cardinfo/${card.id}`)}
              >
                card info
              </button>
                </div>
              </div>
            ))
          ) : (
            <p>No favorite cards available at the moment.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Favorites;