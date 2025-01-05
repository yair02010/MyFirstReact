import { useEffect, useState } from "react";
import { getUserById } from "../services/UserService";
import Navbar from "./NavBar";
import "../css/Profile.css";

function Profile() {
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        middleName: "",
        email: "",
        phone: "",
        state: "",
        city: "",
    });

    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await getUserById();
                setUser(res);
            } catch (err) {
                setError("Failed to fetch user data. Please try again.");
                console.error("Error fetching user:", err);
            }
        };

        fetchUser();
    }, []);

    if (error) {
        return (
            <>
                <Navbar />
                <div className="profile-container">
                    <h4 className="profile-header">Profile</h4>
                    <p className="profile-error">{error}</p>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="profile-container">
                <h4 className="profile-header">Profile</h4>
                <div className="profile-card">
                    <i className="profile-icon bi bi-person"></i>
                    <div className="profile-card-text">
                        <strong>Name:</strong> {user.firstName + " " + user.middleName + " " + user.lastName}
                    </div>
                </div>
                <div className="profile-card">
                    <i className="profile-icon bi bi-envelope"></i>
                    <div className="profile-card-text">
                        <strong>Email:</strong> {user.email}
                    </div>
                </div>
                <div className="profile-card">
                    <i className="profile-icon bi bi-phone"></i>
                    <div className="profile-card-text">
                        <strong>Phone:</strong> {user.phone}
                    </div>
                </div>
                <div className="profile-card">
                    <i className="profile-icon bi bi-geo-alt"></i>
                    <div className="profile-card-text">
                        <strong>State:</strong> {user.state}
                    </div>
                </div>
                <div className="profile-card">
                    <i className="profile-icon bi bi-geo"></i>
                    <div className="profile-card-text">
                        <strong>City:</strong> {user.city}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;
