// Cards.js
import { useEffect, useState } from "react";
import { getAllCards, createCard } from "../services/CardsService";
import { getUserById, getUserFavorites } from "../services/UserService";
import Navbar from "./NavBar";
import "../css/Cards.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faSolidHeart } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import AddCardModal from "../components/AddCardModal";
import UpdateCardModal from "../components/UpdateCardModal";

function Cards() {
  const [cards, setCards] = useState([]);
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);
  const [isBusiness, setIsBusiness] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId")?.replace(/"/g, ""); 
    if (userId) {
      getUserById()
        .then((userData) => {
          setUser(userData);
          setIsBusiness(userData.isBusiness || false);
        })
        .catch((err) => {
          console.error("Error fetching user:", err);
          setError("Failed to fetch user data.");
        });
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem("userId")?.replace(/"/g, ""); 
        if (!userId) {
          setError("Please log in to view the cards.");
          return;
        }

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

  const handleEditCard = (card) => {
    const userId = user?.id; 
    const cardOwnerId = card.ownerId.replace(/"/g, "");

    if (cardOwnerId === userId) {
      setSelectedCard(card);
      setOpenEditModal(true);
    } else {
      alert("You can only edit your own cards.");
    }
  };

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
        {isBusiness && (
          <button className="btn btn-success" onClick={() => setOpenAddModal(true)}>
            Add Card
          </button>
        )}
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
                <button
                  className="btn btn-primary"
                  onClick={() => navigate(`/cardinfo/${card.id}`)}
                >
                  Card Info
                </button>
                <button
                  className="btn btn-warning"
                  onClick={() => handleEditCard(card)}
                >
                  Edit Card
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AddCardModal
        show={openAddModal}
        onHide={() => setOpenAddModal(false)}
      />

      <UpdateCardModal
        show={openEditModal}
        onHide={() => setOpenEditModal(false)}
        card={selectedCard}
      />
    </>
  );
}

export default Cards;
