import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/NavBar';
import Footer from './components/Fotter';
import Login from './components/Login';
import Home from './components/Home';
import Register from './components/Register';
import NotFound from './components/NotFound';
import Products from './components/Products';
import Profile from './components/Profile';
import Cards from './components/Cards';
import About from './components/About';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Products" element={<Products />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="/Profile" element={<Profile/>} />
          <Route path="/cards" element={<Cards/>} />
          <Route path='/about' element={<About/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
