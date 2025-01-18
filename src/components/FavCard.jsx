import { useEffect, useState } from "react";
import Navbar from "./NavBar";
import "../css/favcards.css";
import "../css/favCardRes.css";
import { getUserFavorites, getUserById } from "../services/UserService";
import { getAllCards } from "../services/CardsService";
import { useNavigate } from "react-router-dom";
import Footer from "./Fotter";

function Favorites() {
  const [favoriteCards, setFavoriteCards] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const userId = localStorage.getItem("userId")?.replace(/"/g, "");
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
                  src={card.ImageUrl || "default-image.jpg"}
                  alt={card.ImageAlt || "Card image"}
                />
                <div className="favorites-card-body">
                  <h5 className="favorites-card-title">{card.Title}</h5>
                  <p className="favorites-card-text">{card.Description}</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate(`/cardinfo/${card.id}`)}
                  >
                    Card Info
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No favorite cards available at the moment.</p>
          )}
        </div>
      </div>
          <Footer/>

    </>  );
}

export default Favorites;
