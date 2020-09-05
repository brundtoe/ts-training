import handlebars from 'handlebars'

import {authorsView} from "../views/authors"
import {fetchJson} from "../modules/fetchJson"
import loadView from "../util/loadView"
import docElement from "../util/renderElement"

const hbsTemplate05 = <HTMLElement>document.getElementById('hbs05-template')
hbsTemplate05.addEventListener('click', (e) => {

    e.preventDefault()

    const url = '/bookstore/authors/sample/12'
    fetchJson(url).then((data) => {
        loadView(handlebars, authorsView, data, 'data')
        console.log('hentet og indsat data på siden ')
    }).catch((err) => {
        docElement.renderHtml('error',err.message)
    })
})
