
#  Projet IoT Cloud – Backend & Frontend

Ce projet est une application IoT Cloud permettant de gérer des **températures** (MySQL) et **humidité** (MongoDB) via un **backend Node.js/Express**, et un **frontend AngularJS** (non fonctionnel pour le moment).

---

##  Prérequis

- Node.js (v18 ou supérieur recommandé)
- npm
- MySQL installé et en cours d'exécution
- Un cluster MongoDB Atlas actif

---

##  Installation

###  Étapes backend


2. **Installer les dépendances**

```bash
npm install
```

3. **Configurer MySQL**

Vérifié que le fichier `config/mysql.js` contient les bons identifiants :

```js
host: 'localhost',
user: 'root',
password: '',
database: 'iot_cloud'
```

La table `temperature` doit exister dans MySQL :

```sql
CREATE TABLE temperature (
  id INT AUTO_INCREMENT PRIMARY KEY,
  value FLOAT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

4. **Lancer le serveur**

```bash
node app.js
```

```
🚀 Serveur démarré sur http://localhost:3000
✅ Connecté à MongoDB Atlas
Ok - Connecté à la base de données MySQL.
```

---

##  Tester l'API backend

###  Tester l'inscription (pas obligé en fonction de si il existe deja ou pas)
```bash

$body = @{
    username = "admin"
    password = "admin"
    role     = "admin"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/users/register" `
                  -Method Post `
                  -Body $body `
                  -ContentType "application/json"
```

###  Connexion et récupération de session

```bash
$body = @{
    username = "admin"
    password = "admin"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/users/login" `
                  -Method Post `
                  -Body $body `
                  -ContentType "application/json" `
                  -SessionVariable session```

###  Profil (vérifier session)

```bash
curl -b cookies.txt http://localhost:3000/api/users/profile
```

###  Récupérer les températures (MySQL)

```bash
curl http://localhost:3000/api/temperature
```

###  Ajouter une température

```bash
curl -X POST http://localhost:3000/api/temperature -H "Content-Type: application/json" -d '{"value": 22.5}'
```

###  Récupérer les humidités (MongoDB)

```bash
curl http://localhost:3000/api/humidity
```

###  Ajouter une humidité

```bash
curl -X POST http://localhost:3000/api/humidity -H "Content-Type: application/json" -d '{"value": 55.5}'
```

---

## ⚠Statut du Frontend

Le backend fonctionne **parfaitement** avec MongoDB (humidité) et MySQL (températures).

 **Le frontend AngularJS n'est pas fonctionnel actuellement** :

- Les contrôleurs ne sont pas reconnus par AngularJS.
- Les vues ne s’affichent pas correctement.
- Les graphes ne sont pas visibles.

---

##  Structure du projet

```
/backend
  app.js
  /routes
    temperatureRoutes.js
    humidityRoutes.js
    userRoutes.js
  /models
    temperatureModel.js
    humidityModel.js
    userModel.js
  /config
    mysql.js
    mongo.js

/frontend
  app.js
  /views
    login.html
    dashboard.html
    home.html
  /controllers
  /services
```

---

## Suggestions

- Migrer le frontend vers **Angular moderne** (Angular CLI).
- Ajouter un système d'erreurs plus clair côté frontend.
- Ajouter un dashboard minimal en HTML si AngularJS continue à poser problème.

---


