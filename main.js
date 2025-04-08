// Importation des modules nécessaires d'Electron (ESM syntax)
import { app, BrowserWindow } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

// Emuler __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let win;

function createWindow() {
  win = new BrowserWindow({
    maxWidth: 510,
    maxHeight: 897,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  if (process.env.NODE_ENV === 'development') {
    win.loadURL('http://localhost:5173');
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(__dirname, 'dist', 'index.html')).catch((err) => {
      console.error("Erreur lors du chargement de l'index.html :", err);
    });
  }

  win.on('closed', () => {
    win = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on('browser-window-created', (event, window) => {
  window.webContents.on('crashed', () => {
    console.error('La fenêtre a planté.');
  });
});

process.on('uncaughtException', (error) => {
  console.error('Erreur non capturée :', error);
});





// // Importation des modules nécessaires d'Electron
// const { app, BrowserWindow } = require('electron');
// const path = require('path');

// let win;

// // Fonction pour créer la fenêtre de l'application
// function createWindow() {
//   // Créer la fenêtre principale
//   win = new BrowserWindow({
//     maxWidth: 566,
//     maxHeight: 891,
//     webPreferences: {
//       nodeIntegration: false, // Assure-toi que la sécurité est bien prise en compte
//       contextIsolation: true, // Sécurise l'intégration entre Electron et React
//     },
//   });

//   // Vérifie l'environnement (dev ou production) et charge l'URL appropriée
//   if (process.env.NODE_ENV === 'development') {
//     // En mode développement, charge l'URL locale de l'app React
//     win.loadURL('http://localhost:5173');
//   } else {
//     // En production, charge la version buildée de l'app React
//     win.loadFile(path.join(__dirname, 'dist', 'index.html')).catch((err) => {
//       console.error('Erreur lors du chargement de l\'index.html :', err);
//     });
//   }

//   // Ouvre les outils de développement en mode développement
//   if (process.env.NODE_ENV === 'development') {
//     win.webContents.openDevTools();
//   }

//   // Quand la fenêtre est fermée, détruire l'objet de la fenêtre
//   win.on('closed', () => {
//     win = null;
//   });
// }

// // Lorsque l'application est prête, crée la fenêtre
// app.whenReady().then(createWindow);

// // Quitter l'application lorsque toutes les fenêtres sont fermées (excepté sur Mac)
// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });

// // Si l'application est activée (en particulier sur Mac), recrée la fenêtre si elle n'existe pas
// app.on('activate', () => {
//   if (BrowserWindow.getAllWindows().length === 0) {
//     createWindow();
//   }
// });

// // Gérer les erreurs lors de l'ouverture de la fenêtre
// app.on('browser-window-created', (event, window) => {
//   window.webContents.on('crashed', () => {
//     console.error('La fenêtre a planté.');
//   });
// });

// // Gestion des erreurs globales (si l'app plante)
// process.on('uncaughtException', (error) => {
//   console.error('Erreur non capturée :', error);
// });









// // Importation des modules nécessaires d'Electron
// const { app, BrowserWindow, protocol } = require('electron');
// const path = require('path');
// const fs = require('fs');

// let win;

// // Fonction pour créer la fenêtre de l'application
// function createWindow() {
//   // Créer la fenêtre principale
//   win = new BrowserWindow({
//     width: 691,
//     height: 867,
//     webPreferences: {
//       nodeIntegration: false, // Sécurité renforcée
//       contextIsolation: true, // Sécurise l'intégration entre Electron et React
//     },
//   });

//   if (process.env.NODE_ENV === 'development') {
//     // En mode développement, charger l'URL locale de l'application React
//     win.loadURL('http://localhost:5173');
//     win.webContents.openDevTools(); // Ouvre les outils de développement
//   } else {
//     // Vérifier si le fichier index.html existe avant de charger
//     const indexPath = path.join(__dirname, 'dist', 'index.html');

//     if (!fs.existsSync(indexPath)) {
//       console.error("❌ Erreur : index.html introuvable ! Vérifie que 'npm run build' a bien généré les fichiers.");
//       return;
//     }

//     // Charger l'application React en mode production
//     win.loadURL(`file://${indexPath}`).catch((err) => {
//       console.error('Erreur lors du chargement de l\'index.html :', err);
//     });
//   }

//   // Gérer la fermeture de la fenêtre
//   win.on('closed', () => {
//     win = null;
//   });
// }

// // Intercepter les fichiers pour éviter les erreurs de chargement en mode production
// app.whenReady().then(() => {
//   protocol.interceptFileProtocol('file', (request, callback) => {
//     const url = request.url.substr(7); // Retire "file://"
//     callback({ path: path.normalize(url) });
//   });

//   createWindow();

//   // Sur Mac, recréer une fenêtre si l'application est activée mais qu'il n'y a pas de fenêtre ouverte
//   app.on('activate', () => {
//     if (BrowserWindow.getAllWindows().length === 0) {
//       createWindow();
//     }
//   });
// });

// // Quitter l'application lorsque toutes les fenêtres sont fermées (sauf sur Mac)
// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });

// // Gérer les erreurs lors de l'ouverture de la fenêtre
// app.on('browser-window-created', (event, window) => {
//   window.webContents.on('crashed', () => {
//     console.error('❌ La fenêtre a planté.');
//   });
// });

// // Gestion des erreurs globales (si l'app plante)
// process.on('uncaughtException', (error) => {
//   console.error('❌ Erreur non capturée :', error);
// });
