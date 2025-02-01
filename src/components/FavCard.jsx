import { useEffect, useState } from "react";
import Navbar from "./NavBar";
import "../css/favcards.css";
import "../css/favCardRes.css";
import { getAllCards } from "../services/CardsService";
import { useNavigate } from "react-router-dom";
import { getUserById, getUserFavorites, updateFavorites } from "../services/UserService";
import Footer from "./Fotter";
import { faV } from "@fortawesome/free-solid-svg-icons/faV";
import CardsList from './CardsList';
function Favorites() {
  const [favoriteCards, setFavoriteCards] = useState([]);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [isBusiness, setIsBusiness] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
    fetchFavorites();
  }, []);
  const fetchFavorites = async () => {
      try {
        const userId = localStorage.getItem("userId")?.replace(/"/g, "");
        if (!userId) {
          notify("","Please log in to view the Favorites cards.");
          return;
        }
        const allCards = await getAllCards();
        const filteredCards = allCards.filter((card) => card.likes.includes(userId));

        setFavoriteCards(filteredCards);
      } catch (err) {
        setError("Failed to load favorite cards.");
      }
  };
  const fetchUser = async () => {
      try {
        const userId = localStorage.getItem("userId")?.replace(/"/g, "");
        if (!userId) {
          notify("","Please log in to view the Favorites cards.");
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

        
      } catch (err) {
       
      }
  };
  return (
    <>
      <Navbar />
      <div className="favorites-page">
        <h1>Favorite Cards</h1>
        {error && <p className="error-message">{error}</p>}
        <div className="favorites-grid">
          {favoriteCards.length > 0 ? (
            <CardsList Cards={favoriteCards} User={user} Fetch={fetchFavorites}/>
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
