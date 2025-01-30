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
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 10;
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
        setCards(allCards);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load cards. Please try again later.");
      }
    };

    fetchData();
  }, []);

  const filteredCards = cards.filter((card) =>
    (card.Title || card.title || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);

  const totalPages = Math.ceil(filteredCards.length / cardsPerPage);

  return (
    <>
      <Navbar />
      <div className="search-container">
        <input
          className="search-box"
          type="text"
          placeholder="Search by Title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <h4 className="cards-header">Cards</h4>
      {(isBusiness || isAdmin) && (
      <button className="btn-success-bg" onClick={() => setOpenAddModal(true)}>
      Add Card
      </button>

      )}
      {error && <p className="text-danger">{error}</p>}
      <div className="cards-grid">
        {currentCards.map((card) => (
          <div className="card" key={card._id}>
            <img
              className="card-img-top"
              src={card.image.url || "default-image.jpg"}
              alt={card.image.alt || "Card image"}
            />
            <div className="card-body">
              <h5 className="card-title">{card.title}</h5>
              <p className="card-text">{card.description}</p>
              <FontAwesomeIcon
                icon={card.likes.length > 0 ? faSolidHeart : faRegularHeart}
                style={{
                  cursor: "pointer",
                  color: card.likes.length > 0 ? "red" : "gray",
                }}
                onClick={() => handleFavoriteClick(card._id)}
              />
              {(card.userId === user?.id || isAdmin) && (
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
                    onClick={() => handleDeleteCard(card._id, card.userId)}
                  />
                </>
              )}
              <FontAwesomeIcon
                icon={faInfoCircle}
                className="text-info mx-2"
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/cardinfo/${card._id}`)}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
        <span> Page {currentPage} of {totalPages} </span>
        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
      </div>
      <AddCardModal show={openAddModal} onHide={() => setOpenAddModal(false)} />
      <UpdateCardModal show={openEditModal} onHide={() => setOpenEditModal(false)} card={selectedCard} />
      <Footer />
    </>
  );
}

export default Cards;
