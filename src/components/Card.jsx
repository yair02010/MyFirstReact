import { useEffect, useState } from "react";
import { getAllCards, deleteCard, getCardById } from "../services/CardsService";
import { getUserById, getUserFavorites, updateFavorites } from "../services/UserService";
import Navbar from "./NavBar";
import "../css/Card.css";
import "../css/CardsRes.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faSolidHeart, faPenToSquare, faInfoCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import AddCardModal from "../components/AddCardModal";
import UpdateCardModal from "../components/UpdateCardModal";
import Footer from "./Fotter";
import { notify } from "../utils/notify";
function Card({ card, isAdmin, user, handleDeleteCard, handleEditCard, handleFavoriteClick }) {
   
    const navigate = useNavigate();
    const ifLike=(card)=>{
        let f = false;
        card.likes.forEach(l => {
        if(l==user?._id){
            f= true;
        }  
        
        });
        return f; 
    }
    return (
        <>
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
                    icon={ifLike(card) ? faSolidHeart : faRegularHeart}
                    style={{
                    cursor: "pointer",
                    color:ifLike(card)? "red" : "gray",
                    }}
                    onClick={() => handleFavoriteClick(card._id)}
                />
                {(card.user_id === user?._id || isAdmin) && (
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
                        onClick={() => handleDeleteCard(card._id, card.user_id)}
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
            
        
      
        </>
        );
    }

export default Card;
