import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
