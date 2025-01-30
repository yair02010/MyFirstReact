import { useEffect, useState } from "react";
import { getAllCards } from "../services/CardsService";
import { getUserById } from "../services/UserService";
import Navbar from "./NavBar";
import "../css/Mybizz.css";
import Footer from "./Fotter";

function MyCards() {
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const fetchUserAndCards = async () => {
      try {
        const userId = localStorage.getItem("userId")?.replace(/"/g, "");
        if (!userId) {
          setError("Please log in to view your cards.");
          return;
        }

        const user = await getUserById(userId);

        if (user.isAdmin || user.isBusiness) {
          setIsAuthorized(true);
          const allCards = await getAllCards();
          const userCards = allCards.filter((card) => card.user_id === userId);
          setCards(userCards);
        } else {
          setError("You are not authorized to view this page.");
        }
      } catch {
        setError("Failed to load cards. Please try again later.");
      }
    };

    fetchUserAndCards();
  }, []);

  return (
    <>
      <Navbar />
      <div className="my-cards-page">
        <h1>My Cards</h1>
        {error && <p className="error-message">{error}</p>}
        {!error && isAuthorized && (
          <div className="my-cards-grid">
            {cards.length > 0 ? (
              cards.map((card) => (
                <div className="my-card" key={card._id}>
                  <img
                    className="my-card-img"
                    src={card.image.url || "default-image.jpg"}
                    alt={card.image.alt || "Card image"}
                  />
                  <div className="my-card-body">
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-cards">No cards found.</p>
            )}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default MyCards;
