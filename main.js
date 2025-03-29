// Importation des modules nécessaires d'Electron
const { app, BrowserWindow } = require('electron');
const path = require('path');

let win;

// Fonction pour créer la fenêtre de l'application
function createWindow() {
  // Créer la fenêtre principale
  win = new BrowserWindow({
    width: 809,
    height: 600,
    webPreferences: {
      nodeIntegration: false, // Assure-toi que la sécurité est bien prise en compte
      contextIsolation: true, // Sécurise l'intégration entre Electron et React
    },
  });

  // Vérifie l'environnement (dev ou production) et charge l'URL appropriée
  if (process.env.NODE_ENV === 'development') {
    // En mode développement, charge l'URL locale de l'app React
    win.loadURL('http://localhost:5173');
  } else {
    // En production, charge la version buildée de l'app React
    win.loadFile(path.join(__dirname, 'dist', 'index.html')).catch((err) => {
      console.error('Erreur lors du chargement de l\'index.html :', err);
    });
  }

  // Ouvre les outils de développement en mode développement
  if (process.env.NODE_ENV === 'development') {
    win.webContents.openDevTools();
  }

  // Quand la fenêtre est fermée, détruire l'objet de la fenêtre
  win.on('closed', () => {
    win = null;
  });
}

// Lorsque l'application est prête, crée la fenêtre
app.whenReady().then(createWindow);

// Quitter l'application lorsque toutes les fenêtres sont fermées (excepté sur Mac)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Si l'application est activée (en particulier sur Mac), recrée la fenêtre si elle n'existe pas
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Gérer les erreurs lors de l'ouverture de la fenêtre
app.on('browser-window-created', (event, window) => {
  window.webContents.on('crashed', () => {
    console.error('La fenêtre a planté.');
  });
});

// Gestion des erreurs globales (si l'app plante)
process.on('uncaughtException', (error) => {
  console.error('Erreur non capturée :', error);
});












// // Electron code
// const { app, BrowserWindow, ipcMain } = require('electron');
// const path = require('path');

// let win;

// // Fonction pour créer la fenêtre de l'application
// function createWindow() {
//   // Créer la fenêtre principale
//   win = new BrowserWindow({
//     width: 809,
//     height: 600,
//     webPreferences: {
//       nodeIntegration: false,  // Assure-toi que la sécurité est bien prise en compte
//       contextIsolation: true,  // Sécurise l'intégration entre Electron et React
//     },
//   });

//   // Si tu es en mode développement, charge l'URL locale de l'app React
//   if (process.env.NODE_ENV === 'development') {
//     win.loadURL('http://localhost:5173');  // Charge l'URL locale du projet React
//   } else {
//     // Sinon, charge la version empaquetée de ton app React
//     win.loadFile(path.join(__dirname, 'dist', 'index.html'));
// }

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
