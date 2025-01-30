import { useEffect, useState } from "react";
import Navbar from "./NavBar";
import "../css/favcards.css";
import "../css/favCardRes.css";
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

        const allCards = await getAllCards();
        const filteredCards = allCards.filter((card) => card.likes.includes(userId));

        setFavoriteCards(filteredCards);
      } catch (err) {
        setError("Failed to load favorite cards.");
      }
    };

    fetchFavorites();
  }, []);

  return (
    <>
      <Navbar />
      <div className="favorites-page">
        <h1>Favorite Cards</h1>
        {error && <p className="error-message">{error}</p>}
        <div className="favorites-grid">
          {favoriteCards.length > 0 ? (
            favoriteCards.map((card) => (
              <div className="favorites-card" key={card._id}>
                <img
                  className="favorites-card-img"
                  src={card.image.url || "default-image.jpg"}
                  alt={card.image.alt || "Card image"}
                />
                <div className="favorites-card-body">
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                  <button
                    className="btn-view"
                    onClick={() => navigate(`/cardinfo/${card._id}`)}
                  >
                    View Card
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="no-favorites">No favorite cards available at the moment.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Favorites;
