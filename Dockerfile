# Použij oficiální Node.js obraz s konkrétní verzí
FROM node:20.9.0-bullseye-slim
 
# Nastav pracovní adresář v kontejneru
WORKDIR /usr/src/app
 
# Zkopíruj package.json a package-lock.json do pracovního adresáře
COPY package*.json ./
 
# Nainstaluj závislosti
RUN npm install --production
 
# Zkopíruj zbytek aplikace do pracovního adresáře
COPY . .
 
# Exponuj port 3000, na kterém server běží
EXPOSE 3000
 
# Definuj příkaz pro spuštění aplikace
CMD ["node", "server.js"]