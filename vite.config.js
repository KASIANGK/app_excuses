import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  
  // Configuration pour les chemins relatifs
  base: './',  // Définit la base des ressources à un chemin relatif, ce qui est nécessaire pour Electron

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),  // Assurez-vous que 'src' est bien le dossier racine de votre code
    },
  },

  build: {
    // Dossier où les fichiers compilés seront générés
    outDir: 'dist',  // Le dossier de sortie du build
    assetsDir: 'assets',  // Les assets (images, CSS, JS) seront dans le dossier 'assets' à l'intérieur de 'dist'
    // Le format de sortie des fichiers .css et .js sera le même, vous pouvez adapter ça si nécessaire
  },

  // Configuration pour les fichiers publics
  publicDir: 'public',  // Ce dossier contient les assets comme les images, etc.
});
