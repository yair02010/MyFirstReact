import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Navbar from './components/NavBar';
import Footer from './components/Fotter';
import Login from './components/Login';
import Home from './components/Home';
import Register from './components/Register';
import NotFound from './components/NotFound';
import Profile from './components/Profile';
import Cards from './components/Cards';
import About from './components/About';
import FavCard from './components/FavCard';
import Fotter from './components/Fotter';
import PrivacyPolicy from './components/PrivacyPolicy';
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="/Profile" element={<Profile/>} />
          <Route path="/cards" element={<Cards/>} />
          <Route path='/about' element={<About/>}/>
          <Route path='/fav-card' element={<FavCard/>}/>
          <Route path='/PrivacyPolicy' element={<PrivacyPolicy/>}/>
        </Routes>
      </Router>
      <Fotter/>
    </>
  );
}

export default App;
