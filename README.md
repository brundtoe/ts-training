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
