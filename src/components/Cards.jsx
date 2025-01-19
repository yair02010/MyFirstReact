import { useEffect, useState } from "react";
import { getAllCards, deleteCard } from "../services/CardsService";
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

function Cards() {
  const [cards, setCards] = useState([]);
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);
  const [isBusiness, setIsBusiness] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId")?.replace(/"/g, "");
    if (userId) {
      getUserById()
        .then((userData) => {
          setUser(userData);
          setIsBusiness(userData.isBusiness || false);
          setIsAdmin(userData.isAdmin || false);
        })
        .catch(() => setError("Failed to fetch user data."));
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
    if (card.ownerId === userId || isAdmin) {
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

      await updateFavorites(user.id, updatedFavorites);
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

  const handleDeleteCard = async (cardId, ownerId) => {
    const userId = user?.id;

    if (userId === ownerId || isAdmin) {
      const confirmDelete = window.confirm("Are you sure you want to delete this card?");
      if (!confirmDelete) return;

      try {
        await deleteCard(cardId);
        setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
        alert("Card deleted successfully.");
      } catch (err) {
        console.error("Error deleting card:", err);
        alert("Failed to delete the card. Please try again.");
      }
    } else {
      alert("You are not authorized to delete this card.");
    }
  };

  const filteredCards = cards.filter((card) =>
    card.Title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="cards-container">
        <div className="search-container">
          <input
            className="form-control mb-3"
            type="text"
            placeholder="Search by Title"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <h4 className="cards-header">Cards</h4>
        {(isBusiness || isAdmin) && (
          <button className="btn btn-success" onClick={() => setOpenAddModal(true)}>
            Add Card
          </button>
        )}
        {error && <p className="text-danger">{error}</p>}
        <div className="cards-grid">
          {filteredCards.map((card) => (
            <div className="card" key={card.id}>
              <img
                className="card-img-top"
                src={card.ImageUrl || "default-image.jpg"}
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
                {(card.ownerId === user?.id || isAdmin) && (
                  <>
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      className="text-warning mx-2"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleEditCard(card)}
                    />
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="text-danger mx-2"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDeleteCard(card.id, card.ownerId)}
                    />
                  </>
                )}
                <FontAwesomeIcon
                  icon={faInfoCircle}
                  className="text-info mx-2"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/cardinfo/${card.id}`)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <AddCardModal show={openAddModal} onHide={() => setOpenAddModal(false)} />

      <UpdateCardModal
        show={openEditModal}
        onHide={() => setOpenEditModal(false)}
        card={selectedCard}
      />
      <Footer />
    </>
  );
}

export default Cards;
