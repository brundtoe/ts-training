# TypeScript prototype

Anvendes i forbindelse med træning i at anvende TypeScript

**Work in Progress**

## Opdatering august 2023

- Refaktoreret fra require til import

Der resterer et antal require statements fordi jest test cases pt ikke kan importere de pågældende moduler.
Årsagen er at import statements medfører at typescript validerer type/interface definitioner hvilket require ikke gør
mocks er eksempelvis ikke kompatible med type Request



## Opdatering februar 2023

- Node packages er opdateret
- Frontend er fjernet
- Backend omlagt så adgang er http://localhost:3300/api
- Tilføjet environment variable som krævet af Node.js >= 17
 
## Indhold

Appen er opbygget på grundlag af en standard WebStorm Node.js Express app med Handlebars som view engine

Backend er omlagt fra native JavaScript til TypeScript

## environment

Environment for appen er defineret i backend/src/.env

For docker overrules det af backend/.env og docker-compose.yml anvendelse heraf

Der er kun defineret en ip adresse for node serveren, som krævet af Node.js >= 17

## Databasen bookstore

Der anvendes filen json-data/bookstore.json som backend database.

Databasen indeholder entiteterne authors, books og users, der indlæses i et **map objekt**

Databasen resettes hver gang applikationen genstartes.

Denne database model medfører at database adgang foregår synkront, idet databasen er indlæst i memory

## Build og run backend

production mode

- npm run build-node (Backend build)
- npm start-prod     (Backend run prod)

Development mode
- npm run start-dev   (Backend ts-node dev)

Applikationen er tilgængelig via http://localhost:3300

De enkelte entiteter eksempelvis via

    http://localhost/api/authors/[:id]

## Test med Jest

Backend tests med jest. Run test med:

    npm test

Bemærk
- Jest builder applikationen med backend/tsconfig.json
- Applikationen skal ikke startes!
