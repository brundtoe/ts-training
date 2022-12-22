# ts-training

Træningsprojekt i anvendelse af typeScript

Projektet består af en frontend og en backend, der begge er skrevet i TypeScript

Frontend runnes med **http-server**

Backend er en Node.js Expess applikation

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

## Run docker environment
Backend image skal re-buildes, når node packages er opdateret

```shell
cd backend 
docker build -t ts-backend:prod .
```

### Model Francois Romain

Opdater frontend/src/util/config.ts
- URI i frontend anvender **window.location.origin**.

```shell
cd backend
npm run build-node
cd frontend 
npm run build
cd <project root>
docker-compose up -d
````

Frontend: http://localhost:8080
Backend:  http://localhost:3300

Nginx lytter på port 8080 og port 3300

### docker compose frontend og backend

Opdater frontend/src/util/config.ts
- URI i frontend anvender http://localhost:3300

**Run backend hhv frontend docker-compose.yml**

```
cd backend 
docker build -t ts-backend:prod .
docker-compose -f docker-backend.yml up -d

cd ../frontend
npm run build
docker-compose -f docker-frontend.yml up -d
```

Frontend: http://localhost
Backend: http://localhost:3300

Modellen kan anvendes hvis der kun er behov for at starte frontend eller backend

## Test af backend med Jest

Start en af run konfigurationerne 
