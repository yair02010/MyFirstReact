import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./NavBar";
import Footer from "./Fotter";
import { getCardById } from "../services/CardsService";
import "../css/CardInfo.css";

function CardInfo() {
  const { id } = useParams();
  const [cardinfo, setCardInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const res = await getCardById(id);
        setCardInfo(res);
      } catch {
        setError("Failed to fetch card data. Please try again.");
      }
    };
    fetchCard();
  }, [id]);

  if (error) {
    return (
      <>
        <Navbar />
        <div className="card-info-page">
          <h1>Card Info</h1>
          <p className="error-message">{error}</p>
        </div>
      </>
    );
  }

  if (!cardinfo) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Navbar />
      <div className="card-info-page">
        <h1>Card: {cardinfo.title}</h1>
        <div className="card-info">
          <img
            src={cardinfo.image.url}
            alt={cardinfo.image.alt || "Card image"}
            className="card-info-img"
          />
          <div className="card-info-details">
            <p><strong>Subtitle:</strong> {cardinfo.subtitle}</p>
            <p><strong>Description:</strong> {cardinfo.description}</p>
            <p><strong>Address:</strong> {`${cardinfo.address.street} ${cardinfo.address.houseNumber}, ${cardinfo.address.city}, ${cardinfo.address.state}, ${cardinfo.address.country}`}</p>
          </div>
        </div>
        <div className="card-info-map">
          <iframe
            width="100%"
            height="300"
            style={{ border: 0, borderRadius: "8px" }}
            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDT4w5pwqsMbTL7R0q80L-ULu5QJW9hB5I&q=${cardinfo.address.street}+${cardinfo.address.houseNumber},+${cardinfo.address.city},+${cardinfo.address.state},+${cardinfo.address.country}`}
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CardInfo;
