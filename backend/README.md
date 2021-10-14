# TypeScript prototype

Anvendes i forbindelse med træning i at anvende TypeScript

**Work in Progress**

## Indhold

Appen er opbygget på grundlag af en standard WebStorm Node.js Express app med Handlebars som view engine

Backend er omlagt fra native JavaScript til TypeScript

## Databasen bookstore

Der anvendes filen json-data/bookstore.json som backend database.

Databasen indeholder entiteterne authors, books og users, der indlæses i et **map objekt**

Databasen resettes hver gang applikationen genstartes.

## build og run backend

production mode

- npm run build-node (Backend build)
- npm start-prod     (Backend run prod)

Development mode
- npm run start-dev

Databasen er tilgængelig via http://localhost:3300/bookstore




