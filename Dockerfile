FROM node:latest as react_node
# Définir le répertoire de travail dans le conteneur
WORKDIR /app
# Copiez package.json dans le répertoire de travail
COPY package.json ./
# Installer les dépendances
RUN npm install
# Copiez l'intégralité du code de l'application dans le conteneur
COPY ./ /app/
# Créez l'application React pour la production
RUN npm run build
# Utiliser Nginx comme serveur de production
FROM nginx:latest
# Copiez l'application React construite dans le répertoire du serveur Web de Nginx
COPY --from=react_node /app/build /usr/share/nginx/html
# Exposer le port 80 pour le serveur Nginx
EXPOSE 3000

# Démarrez Nginx lorsque le conteneur s'exécute
CMD ["nginx", "-g", "daemon off;"]