import { toast } from "react-toastify";

export function notify(action) {
switch (action) {
    case "login":
    toast.success("You have successfully logged in!");
    break;
    case "signup":
    toast.success("You have successfully signed up!");
    break;
    case "logout":
    toast.info("You have successfully logged out!");
    break;
    default:
    toast.error("An unknown action occurred.");
}
}
