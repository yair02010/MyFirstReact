import { useEffect, useState } from "react";
import { getUserById } from "../services/UserService";

function Profile() {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        isadmin: false,
    });

    const [error, setError] = useState(null); // משתנה לניהול שגיאות

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await getUserById(); // קריאה ל-API
                setUser(res.data); // עדכון סטייט עם הנתונים מהשרת
            } catch (err) {
                setError("Failed to fetch user data. Please try again."); // הגדרת הודעת שגיאה
                console.error("Error fetching user:", err); // הדפסת שגיאה לקונסול
            }
        };

        fetchUser();
    }, []); // [] מבטיח שהאפקט ירוץ רק פעם אחת כשנטען

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
            <div className="container">
                <h4 className="display-4 my-3">Profile</h4>
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
            </div>
        </>
    );
}

export default Profile;
