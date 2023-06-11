# Handlebars demo

Opdateret marts 2021

Dette er et modul i projekt ts-training

## run modulet

    cd ts-training/hbars-demo
    npm start

    cd ts/training/backend
    npm run build-node
    npm start

## Funktionalitet
Appen demonstrerer hvordan Handlebars kan anvendes til at formatere output i en frontend app.

Handlebars kan downloades fra cdnjs og indlejres som source i et script tag

Handlebars node modul indeholder i node_modules/handlebars/dist en browser version, som kan indlejres i et script tag

Handlebars kan downloades fra https://handlebarsjs.com/installation/#npm-or-yarn-recommended eller cdnjs link  https://cdnjs.com/libraries/handlebars.js der indlejres

alternativ kan node-modulets browser version anvendes i typescript eksempler

```
// @ts-ignore
import handlebars from '../../node_modules/handlebars/dist/handlebars.min.js'
```

@ts-ignore anvendes, da det i denne anvendelse ikke er muligt at importere typescript definitionen.

Ovenstående import er kun mulig fordi frontend buildes med Webpack.



