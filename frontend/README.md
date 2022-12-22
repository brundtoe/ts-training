# ts-frontend

Dette er en frontend til ts-backend

## status oktober 2021

- node packages er opdateret
- code inspections udført og opdateret - resterende rettes ikke

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

I mappen frontend/public findes en række eksempler på anvendelse af Handlebar templates i en browser

- handlebars indsat som links til https://cdnjs.com/
- handlebars downloaded fra https.//cdnjs.com

Det er en kopi af en typescript kompileret udgave. 


## Docker environment
Frontend image skal buildes med:

```
cd frontend
docker build -t ts-config:prod .    
``` 

Imaget rebuildes hver gang der foretages opdateringer af node_modules 

## test med Cypress
Filen cypress.config.js må ikke være .ts, da webpack-dev-server kompilerer denne til en js fil. Da finder Cypress to config filer og fejler.

Der foretages kun end2end test.

- start frontend dev server
- start backend i prod mode
- start testen med
    
    npx run cypress

Cypress åbnes og testcase kan udvælges til testen

Default konfigurationsfilen cypress.json anvendes

## test med run configurationer

Test kan udføres med IntelliJ run configurations