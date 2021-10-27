# TypeScript prototype

Anvendes i forbindelse med træning i at anvende TypeScript

**Work in Progress**

## opdatering oktober 2021

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
- npm run start-dev

Databasen er tilgængelig via http://localhost:3300/bookstore

## Test med Jest

Backend tests med jest. Run test med:

    npm test

## Test med Cypress

Cypres anvendes primært til test af frontend. Der er en enkelt test script som demo for test af backend.

Test scripts er placeret i frontend hvor cypress er installeret

Run test
- start build backend
- start backend
- run test

    npx cypress run --headless --config-file cypress.backend.json

konfigurationen i frontend/cypress.backend.json lader cypress lytte på port 3300, som er porten til backend


