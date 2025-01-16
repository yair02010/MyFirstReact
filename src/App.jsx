import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.min.css';

// Components
import Navbar from "./components/NavBar";
import Footer from "./components/Fotter";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import NotFound from "./components/NotFound";
import Profile from "./components/Profile";
import Cards from "./components/Cards";
import About from "./components/About";
import FavCard from "./components/FavCard";
import PrivacyPolicy from "./components/PrivacyPolicy";
import CardInfo from "./components/CardInfo";

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cards" element={<Cards />} />
          <Route path="/about" element={<About />} />
          <Route path="/fav-card" element={<FavCard />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/cardinfo/:id" element={<CardInfo />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
