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
import Card from './Card';
function CardsList({Cards, User, Fetch}) {
  const [cards, setCards] = useState(Cards);
  
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
  
    let filteredCards = Cards.filter((card) =>
      (card.Title || card.title || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    let currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);
    const totalPages = Math.ceil(filteredCards.length / cardsPerPage);
    const handleEditCard = (card) => {
      const c = {
        id:card._id,
        title: card.title,
        subtitle: card.subtitle,
        description: card.description,
        email: card.email,
        phone: card.phone,
        web: card.web,
        url: card.image.url,
        alt: card.image.alt,
        state: card.address.state,
        country: card.address.country,
        city: card.address.city,
        street: card.address.street,
        houseNumber: card.address.houseNumber,
        zip: card.address.zip
                
      }
      setSelectedCard(c);
      setOpenEditModal(true);
      
    };
    const handleFavoriteClick = async (cardId) => {
      try {
        let card = await updateFavorites(cardId);
        Fetch();
           
      } catch (error) {
        
        notify("","Failed To Add Or Remove Favorite");
      }
    };
    
    const afterUpdateClose = async (id) => {
      const card = await getCardById(id);
      Fetch();
      setOpenEditModal(false);  
    };
    const handleDeleteCard = async (cardId, cardOwnerId) => {
      if (User?._id !== cardOwnerId && !isAdmin) {
        notify("","You do not have permission to delete this card.");
        return;
      }

      try {
        await deleteCard(cardId);
        Fetch();
        notify("","Card deleted successfully!");
      } catch (error) {
        notify("","Failed to delete the card. Please try again.");
        
      }
  };
  
  return (
    <>
      <Navbar />
      <div className="darckMood">
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
        
      {error && <p className="text-danger">{error}</p>}
      <div className="cards-grid">
        {currentCards.map((card) => (
          
          <Card card={card} isAdmin={isAdmin} user={User} handleDeleteCard={handleDeleteCard}
                handleEditCard={handleEditCard} handleFavoriteClick={handleFavoriteClick}/> 
        ))}
      </div>
      <div className="pagination">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
        <span> Page {currentPage} of {totalPages} </span>
        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
      </div>
      
      <UpdateCardModal show={openEditModal} onHide={() => afterUpdateClose(selectedCard.id)} card={selectedCard} />
        </div>
      
    </>
  );
}

export default CardsList;
