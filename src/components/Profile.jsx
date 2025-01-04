import { useEffect, useState } from "react";
import { getUserById } from "../services/UserService";
import Navbar from "./NavBar";

function Profile() {
    const [user, setUser] = useState({
        firstName: "",
        lastname:"",
        middleName:"",
        email: "",
        password: "",
        isadmin: false,
        phone:"",
        state:"",
        city:"",

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
            <div className="container">
                <h4 className="display-4 my-3">Profile</h4>
                <p className="text-danger">{error}</p>
            </div>
        );
    }

    return (
        <>
        <Navbar/>
        <div className="container">
            <h4 className="display-4 my-3">Profile</h4>
            <p>Name: {user.firstName + "  " +user.middleName+ user.lastName}</p>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <p>State: {user.state}</p>
            <p>City: {user.city}</p>
            
        </div>
        </>
    );
}

export default Profile;
