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

I mappen frontend/public findes en række eksempler på anvendelse af Handlebar templates i en browser

- handlebars indsat som linkt til https://cdnjs.com/
- handlebars downloaded fra https.//cdnjs.com

Det er en kopi af en typescript kompileret udgave. 


## Docker environment
Frontend image skal buildes med:

```
cd frontend
docker build -t ts-config:prod .    
``` 

Imaget rebuildes hver gang der foretages opdateringer af node_modules 

 