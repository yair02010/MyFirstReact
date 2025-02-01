import { useEffect, useState } from "react";
import { getAllCards } from "../services/CardsService";
import { getUserById } from "../services/UserService";
import Navbar from "./NavBar";
import "../css/Mybizz.css";
import Footer from "./Fotter";
import CardsList from './CardsList';
function MyCards() {
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isBusiness, setIsBusiness] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
    const [user, setUser] = useState(null);
  useEffect(() => {
    

    fetchUserAndCards();
  }, []);
  const fetchUserAndCards = async () => {
      try {
        const userId = localStorage.getItem("userId")?.replace(/"/g, "");
        if (!userId) {
          notify("","Please log in to view the your cards.");
          return;
        }
        if (userId) {
          await getUserById()
          .then((userData) => {
            setUser(userData);
            setIsBusiness(userData.isBusiness || false);
            setIsAdmin(userData.isAdmin || false);
          })
          .catch((err) => notify("",err));
        }
        const user = await getUserById(userId);
        setIsAuthorized(true);
        const allCards = await getAllCards();
        const userCards = allCards.filter((card) => card.user_id === userId);
        setCards(userCards);
       
      } catch {
        setError("Failed to load cards. Please try again later.");
      }
    };
  return (
    <>
      <Navbar />
      <div className="my-cards-page">
        <h1>My Cards</h1>
        {error && <p className="error-message">{error}</p>}
        {!error && isAuthorized && (
          <div className="my-cards-grid">
            {cards.length > 0 ? (
               <CardsList Cards={cards} User={user} Fetch={fetchUserAndCards}/>
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
