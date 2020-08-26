# ts-training

Træningsprojekt i anvendelse af typeScript

Projektet består af en frontend og en backend, der begge er skrevet i TypeScript

frontend runnes med **htp-server**

backend er en Node.js Expess applikation

Databasen er en json fil bookstore.json. De tre entiteter (authors, books og users) indlæses til tre Map objekter.

Der er implementeret en data access objekt model med CRUD funktionalitet. Opdatereingern foretages alene i Map objekterne i memory. 

Det betyder, at databasen resettes mellem hver genstart af backend.

Applikationen kan runnes på en local host eller med docker containere

Yderligere info om frontend og backend findes i readme filerne i de to delprojekter

## Run docker enviroment
Der er tre forskellige løsninger

**Den første model** francoisromain kræver, at URI i frontend anvender **window.location.origin**.

````
cd <project root>
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
 