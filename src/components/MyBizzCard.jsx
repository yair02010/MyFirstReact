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
          const userCards = allCards.filter((card) => card.ownerId === userId);
          setCards(userCards);
        } else {
          setError("You are not authorized to view this page.");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load cards. Please try again later.");
      }
    };

    fetchUserAndCards();
  }, []);

  return (
    <>
      <Navbar />
      <div className="my-cards-container">
        <h4 className="my-cards-header">My Cards</h4>
        {error && <p className="text-danger">{error}</p>}
        {!error && isAuthorized && (
          <div className="my-cards-grid">
            {cards.length > 0 ? (
              cards.map((card) => (
                <div className="card" key={card.id}>
                  <img
                    className="card-img-top"
                    src={card.ImageUrl || "default-image.jpg"}
                    alt={card.ImageAlt || "Card image"}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{card.Title}</h5>
                    <p className="card-text">{card.Description}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No cards found.</p>
            )}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default MyCards;
