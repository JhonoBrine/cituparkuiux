import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import "./HomePage/styleMain/navBarMainPage.css"
import { BrowserRouter } from 'react-router-dom';
import ParkCitRouter from './Routes/Routemain';


//fonts

import './fonts/OpenSauce/OpenSauceOne-Black.ttf'
import './fonts/OpenSauce/OpenSauceOne-Regular.ttf'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  
    <BrowserRouter>

      <ParkCitRouter/>
    </BrowserRouter>
  </React.StrictMode>
);


reportWebVitals();
