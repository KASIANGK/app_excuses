# suppression node + reinstallation
rm -rf node_modules/
rm package-lock.json
npm install

npm run dev

# suppresion dist + reinstallation electron
rm -rf dist/ node_modules/
npm install
npm run build
npm run electron-build
