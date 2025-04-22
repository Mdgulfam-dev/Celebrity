import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import router from './routers/router';
import { RouterProvider } from 'react-router-dom';
import "animate.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  
     <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
