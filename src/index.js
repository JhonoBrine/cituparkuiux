import React from 'react';
import ReactDOM from 'react-dom'; // Correct import
import { BrowserRouter } from 'react-router-dom';
import "./HomePage/styleMain/navBarMainPage.css";
import ParkCitRouter from './Routes/Routemain';
import './index.css';
import reportWebVitals from './reportWebVitals';

// fonts

import './fonts/OpenSauce/OpenSauceOne-Black.ttf';
import './fonts/OpenSauce/OpenSauceOne-Regular.ttf';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

      <BrowserRouter>
        <ParkCitRouter />
      </BrowserRouter>
  
  </React.StrictMode>
);

reportWebVitals();
