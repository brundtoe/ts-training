# ts-training

Træningsprojekt i anvendelse af typeScript

Projektet består af en frontend og en backend, der begge er skrevet i TypeScript

frontend runnes med **http-server**

backend er en Node.js Expess applikation

Databasen er en json fil bookstore.json. De tre entiteter (authors, books og users) indlæses til tre Map objekter.

Der er implementeret en data access objekt model med CRUD funktionalitet. Opdateringerne foretages alene i Map objekterne i memory. 

Det betyder, at databasen resettes mellem hver genstart af backend.

Applikationen kan runnes på en local host eller med docker containere

Yderligere info om frontend og backend findes i readme filerne i de to delprojekter

## configuration

frontend/src/util/config.ts indeholder en konfiguration::
```
    export default {
    host_uri: window.location.origin
    }
    /** Anvendes ved docker-frontend, docker-backend
    export default {
    host_uri: 'http://localhost:3300'
    }
    */
```

## Run på hosten development mode

Backend startes:
```
    cd backend
    npm run start-dev
```
Frontend startes:
```
    cd frontend
    npm run serve

```
Backend browser:  http://localhost:3300
frontend browser: http://localhost:8080

## Run på hosten production mode

Backend startes:
```
    cd backend
    npm run build-node
    npm run start-prod
```
Frontend startes:
```
    cd frontend
    npm run build
    npm start
```
Backend browser:  http://localhost:3000
frontend browser: http://localhost:8080

## Run docker enviroment
Der er tre forskellige løsninger

**Den første model** francoisromain kræver, at URI i frontend anvender **window.location.origin**.

```
cd backend
npm run build-node
cd frontend 
npm run build
cd <project root>
docker-compose up -d
````

Frontend: http://localhost:8080
Backend:  http://localhost:3300

nginx lytter på port 8080 og port 3300

Den næste model kræver at **URI til backend (http://localhost:3300)** anvendes i scripts på frontend **opdater frontend/util/config.ts**

**Run frontend hhv backend docker-compose.yml**

```
cd backend 
docker build -t ts-backend:prod .
docker-compose -f docker-backend.yml up -d
```

```
cd ../frontend
npm run build
docker-compose -f docker-frontend.yml up -d
```

Frontend: http://localhost
Backend: http://localhost:3000

Modellen kan anvendes hvis der kun er behov for at starte frontend eller backend

## Test af backend med Jest

Start en af run konfigurationerne 
