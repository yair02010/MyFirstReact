import { useEffect, useState } from "react";
import { getAllCards, deleteCard, getCardById } from "../services/CardsService";
import { getUserById, getUserFavorites, updateFavorites } from "../services/UserService";
import Navbar from "./NavBar";
import "../css/Cards.css";
import "../css/CardsRes.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faSolidHeart, faPenToSquare, faInfoCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import AddCardModal from "../components/AddCardModal";
import UpdateCardModal from "../components/UpdateCardModal";
import Footer from "./Fotter";
import { notify } from "../utils/notify";
import CardsList from './CardsList';
function Cards() {

  const [cards, setCards] = useState([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isBusiness, setIsBusiness] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
   

  useEffect(() => {
    fetchUser();
    fetchData();
  }, []);

  const fetchData = async () => {
      try {
        const allCards = await getAllCards();
        setCards(allCards);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load cards. Please try again later.");
      }
    };   
  const fetchUser = async () => {
      try {
        const userId = localStorage.getItem("userId")?.replace(/"/g, "");
        if (!userId) {
          notify("","Please log in to view the cards.");
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
      <div className="darckMood">
      <h4 className="cards-header">Cards</h4>
      {(isBusiness || isAdmin) && (
        <button className="btnAddcard" onClick={() => setOpenAddModal(true)}>
          Add Card
        </button>

      )}
      {error && <p className="text-danger">{error}</p>}
        <CardsList Cards={cards} User={user} Fetch={fetchData} />
      </div>
      <AddCardModal show={openAddModal} onHide={() => setOpenAddModal(false)} />
      <Footer />
    </>
  );
}

export default Cards;
