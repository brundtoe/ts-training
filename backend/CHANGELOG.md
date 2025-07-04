# Changelog

## 4. juli 2025

Opgraderet til Express 5.1.0
- udførte opgraderingskontrol ``npx @expressjs/codemod upgrade .``
- der var ikke behov for manuelle ændringer

Opgradering til jest 30.0 krævede ændring fra toBeCalledWith til toHaveBeenCalledWith

## Maj 2025

Optimering af error handling
- bin/www tilføjede process handling af unresolved promises og unhandled expectations
- app.js forenklede error handling
- errorhandler revideret er nu en enkelt funktion som error middleware

## Opdatering februar 2025

Rename projekt root tsconfig.json til tsconfig-test.json

Jest konfigurationen i *jest.config.js* anvender jest transformer *ts-jest*, der gør det muligt at tester typescript projektet. Opdateret med path til tsconfig-test.son

Ref. 
> https://kulshekhar.github.io/ts-jest/docs/getting-started/options/tsconfig

Typescript konfigurationen i *tsconfig-base.json* opdateret til NodeNext og ES2023


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
 
