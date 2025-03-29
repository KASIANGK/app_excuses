import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)



// ok btn fenetre
// import { StrictMode, useState } from 'react';
// import { createRoot } from 'react-dom/client';
// import './index.css';
// import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
// import App from './App.jsx';

// // Fonction pour ouvrir la fenêtre avec une taille définie
// const openAppWindow = () => {
//   const windowWidth = 809; // Largeur de la fenêtre
//   const windowHeight = window.innerHeight; // Hauteur de la fenêtre

//   // Options de la fenêtre
//   const windowFeatures = `
//     width=${windowWidth},
//     height=${windowHeight},
//     resizable=yes,
//     scrollbars=yes,
//     menubar=no,
//     toolbar=no,
//     location=no,
//     status=no
//   `;

//   // Ouvre la fenêtre avec l'URL où l'application est servie
//   const newWindow = window.open('http://localhost:5173/app', "_blank", windowFeatures);

//   // Vérifie si la fenêtre a été ouverte correctement
//   if (newWindow) {
//     newWindow.focus();
//   } else {
//     console.log("La fenêtre pop-up a été bloquée.");
//   }
// };

// // Créer un composant pour le bouton d'ouverture de fenêtre
// const OpenWindowButton = () => {
//   return <button onClick={openAppWindow}>Ouvrir dans une nouvelle fenêtre</button>;
// };

// // Composant de l'application principale
// const MainApp = () => {
//   return (
//     <div>
//       <h1>Bienvenue dans notre application</h1>
//       <OpenWindowButton />
//     </div>
//   );
// };

// // Créer la racine de l'application React avec React Router
// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <Router>
//       <Routes>
//         <Route path="/" element={<MainApp />} />
//         <Route path="/app" element={<App />} />
//       </Routes>
//     </Router>
//   </StrictMode>
// );

