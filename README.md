# TypeScript prototype

Applikationen er 21. september 2026 flyttet fra mappen backend til mappen ts-training

Anvendes i forbindelse med træning i at anvende TypeScript

**Work in Progress**

Se [Changelog](./CHANGELOG.md)

## Indhold

Appen er opbygget på grundlag af en standard WebStorm Node.js Express app med Handlebars som view engine

Backend er omlagt fra native JavaScript til TypeScript

## environment

Environment for appen er defineret i backend/src/.env

For docker overrules det af backend/.env og docker-compose.yml anvendelse heraf

Der er kun defineret en ip adresse for node serveren, som krævet af Node.js >= 17

Denne warning under test med Jest

    experimentalwarning: localStorage is not available because --localstorage-file was not provided

Fjernes med node option

    --localstorage-file=./jest-storage

Den samlede commandline

    NODE_OPTIONS='--experimental-vm-modules --localstorage-file=./jest-storage' jest --forceExit --detectOpenHandles

Optionerne --foceExit og --detectOpenHandles er ndøvendiug for at tvinge jest til at standses og lukke evt open handles

## Databasen bookstore

Der anvendes filen json-data/bookstore.json som backend database.

Databasen indeholder entiteterne authors, books og users, der indlæses i et **map objekt**

Databasen resettes hver gang applikationen genstartes.

Denne database model medfører at database adgang foregår synkront, idet databasen er indlæst i memory

## Build og run backend

production mode

- npm run build-node 
- npm run start-prod 

Development mode
- npm run start-dev

Applikationen er tilgængelig via http://localhost:3300

De enkelte entiteter eksempelvis via

    http://localhost/api/authors/[:id]

## Test med Jest

Backend tests med jest. Run test med:

    npm test

Bemærk
- Jest builder applikationen med tsconfig.test.json
- Applikationen skal ikke startes!
