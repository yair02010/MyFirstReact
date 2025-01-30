import { useEffect, useState } from "react";
import { getUserById } from "../services/UserService";
import Navbar from "./NavBar";
import "../css/Profile.css";
import Footer from "./Fotter";

function Profile() {
  const [user, setUser] = useState({
    name: {
      first: "",
      middle: "",
      last: "",
    },
    image: {
      url: "",
      alt: "",
    },
    email: "",
    phone: "",
    address: {
      state: "",
      country: "",
      city: "",
      street: "",
      houseNumber: "",
      zip: "",
    },
    isBusiness: true,
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserById();
        setUser(res);
      } catch {
        setError("Failed to fetch user data. Please try again.");
      }
    };

    fetchUser();
  }, []);

  if (error) {
    return (
      <>
        <Navbar />
        <div className="profile-page">
          <h1>Profile</h1>
          <p className="error-message">{error}</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="profile-page">
        <h1>Profile</h1>
        <div className="profile-info">
          <img
            src={user.image.url || "default-profile.jpg"}
            alt={user.image.alt || "User profile"}
            className="profile-img"
          />
          <div className="profile-details">
            <div className="profile-card">
              <i className="bi bi-person profile-icon"></i>
              <p><strong>Name:</strong> {user.name.first} {user.name.middle} {user.name.last}</p>
            </div>
            <div className="profile-card">
              <i className="bi bi-envelope profile-icon"></i>
              <p><strong>Email:</strong> {user.email}</p>
            </div>
            <div className="profile-card">
              <i className="bi bi-phone profile-icon"></i>
              <p><strong>Phone:</strong> {user.phone}</p>
            </div>
            <div className="profile-card">
              <i className="bi bi-geo-alt profile-icon"></i>
              <p><strong>State:</strong> {user.address.state}</p>
            </div>
            <div className="profile-card">
              <i className="bi bi-geo profile-icon"></i>
              <p><strong>City:</strong> {user.address.city}</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
