# ts-frontend

Dette er en frontend til ts-backend

## Installation

Clone projektet til en local host

Udfør npm install i mapperne

- frontend
- backend

## Kompiler koden

I mappen frontend

```
npm run build 
``` 

I mappen backend

```
npm run build-node
```

## Run

### Run på host

I mappen frontend

```
npm start
```

I mappen backend

```
npm start
```

Adgang via browser

- frontend http://localhost:8080
- backend http://localhost:3300/bookstore

Her skal URI være defineret som **window.location.origin**., idet **http-server** proxier request, som ikke kan serviceres på frontend videre til backend på port 3300

## Docker environment
Frontend image skal buildes med:

```
cd frontend
docker build -t ts-config:prod .    
``` 

Imaget rebuildes hver gang der foretages opdateringer af node_modules 

## Run docker enviroment
Der er tre forskellige løsninger

**Den første model** francoisromain kræver, at URI i frontend anvender **window.location.origin**.

````
cd frontend
docker-compose up -d
````

Frontend: http://localhost
backend: http://localhost/backend eller http://localhost:3300

nginx lytter på port 80 og port 3300

De to næste modeller kræver at **URI til backend (http://localhost:3300)** anvendes i scripts på frontend

**Run frontend hhv backend docker-compose.yml**

```
cd backend 
docker-compose -f docker-backend.yml up -d
cd ../frontend
docker-compose -f docker-frontend.yml up -d
```
Frontend: http://localhost
Backend: http://localhost:3000

Modellen kan anvendes hvis der kun er behvo for at starte frontend eller backend

**Run einsteinish**

```
cd frontend
docker-compose -f docker-compose-einsteinish.yml up -d
```
Frontend: http://localhost
Backend: http://localhost:3300
 


 