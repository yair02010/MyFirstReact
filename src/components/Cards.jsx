import { useEffect, useState } from "react";
import { getAllCards } from "../services/CardsService";
import Navbar from "./NavBar";
import { getUserById } from "../services/UserService";

function Cards() {
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(null);
  const [isAdmin,setisAdmin] =useState(false);
    useEffect(()=>{
    if(localStorage.getItem("userId" != null)){
        getUserById().then((res)=>{
            setisAdmin(res.data.isAdmin)
        }) 
        .catch((err)=>{console.log(err);
        })
    }
  })
  useEffect(() => {
    getAllCards()
      .then((data) => {
        setCards(data || []);
      })
      .catch((err) => {
        setError("Failed to fetch cards. Please try again later.");
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <h4 className="display-4 my-3">Cards</h4>
        {isAdmin&&<button className="btn btn-success">Add Prodact</button>}
        {error && <p className="text-danger">{error}</p>}
        <div className="row mt-3">
          {cards.length > 0 ? (
            cards.map((card) => (
              <div
                className="card col-md-4 mb-4"
                key={card.id}
                style={{ width: "18rem" }}
              >
                <img
                  className="card-img-top"
                  src={card.ImageUrl || "path/to/default-image.jpg"}
                  alt={card.ImageAlt || "Card image"}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{card.Title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {card.Subtitle}
                  </h6>
                  <p className="card-text">{card.Description}</p>
                  <p className="card-text">
                    <strong>Location:</strong> {card.City}, {card.State},{" "}
                    {card.Country}
                  </p>
                  <p className="card-text">
                    <strong>Contact:</strong> {card.Email}, {card.Phone}
                  </p>
                  <button
                    className="btn btn-primary"
                    aria-label={`Contact ${card.Title}`}
                  >
                    Contact
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No cards available at the moment.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Cards;
