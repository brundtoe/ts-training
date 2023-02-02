# TypeScript prototype

Anvendes i forbindelse med træning i at anvende TypeScript

**Work in Progress**

## Opdatering februar 2023

- node packages er opdateret

## Indhold

Appen er opbygget på grundlag af en standard WebStorm Node.js Express app med Handlebars som view engine

Backend er omlagt fra native JavaScript til TypeScript

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

Databasen er tilgængelig via http://localhost:3300

## Test med Jest

Backend tests med jest. Run test med:

    npm test
