import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./NavBar";
import Footer from "./Fotter";
import { getCardById } from "../services/CardsService";
import "../css/CardInfo.css";
import "../css/CardInfoRes.css";

function CardInfo() {
  const { id } = useParams();
  const [cardinfo, setCardInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const res = await getCardById(id);
        setCardInfo(res);
      } catch (err) {
        setError("Failed to fetch card data. Please try again.");
        console.error("Error fetching card:", err);
      }
    };
    fetchCard();
  }, [id]);

  if (error) {
    return (
      <>
        <Navbar />
        <div className="card-info-container">
          <h4 className="card-info-header">Card Info</h4>
          <p className="card-info-error">{error}</p>
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
    <div className="card-info-container">
  <h4 className="card-info-header">Card: {cardinfo.Title}</h4>
  <div className="card card-info-card shadow">
    <img
      src={cardinfo.ImageUrl}
      alt={cardinfo.ImageAlt || "Card image"}
      className="card-img-top card-info-image"
    />
    <div className="card-body">
      <p className="card-text card-info-text">
        <strong>Subtitle:</strong> {cardinfo.Subtitle}
      </p>
      <p className="card-text card-info-text">
        <strong>Description:</strong> {cardinfo.Description}
      </p>
      <p className="card-text card-info-text">
        <strong>Address:</strong> {`${cardinfo.Street} ${cardinfo.Housenumber}, ${cardinfo.City}, ${cardinfo.State}, ${cardinfo.Country}`}
      </p>
    </div>
  </div>
  <div className="card-info-map mt-4">
    <iframe
      width="100%"
      height="300"
      style={{ border: 0, borderRadius: "8px" }}
      src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDT4w5pwqsMbTL7R0q80L-ULu5QJW9hB5I&q=${cardinfo.Street}+${cardinfo.Housenumber},+${cardinfo.City},+${cardinfo.State},+${cardinfo.Country}`}
      allowFullScreen
    ></iframe>
  </div>
</div>
<Footer/>
    </>
  );
}

export default CardInfo;
