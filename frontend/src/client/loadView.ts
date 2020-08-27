import {authorsView} from "../views/eksempler.js";
import docClass from "../util/renderHtmlElement.js";

const authors = [
    {
        author:
            {
                firstname: 'Jens',
                lastname: 'Andersen',
                mail: 'jens@anymail.com'
            }
    },
    {
        author: {
            firstname: 'Marie',
            lastname: 'Hansen',
            mail: 'marie@anymail.com'
        }
    }]

export default function (handlebars: any, domElement: string) {

    handlebars.registerHelper('fullname', function (author: any) {
        return `${author.firstname} ${author.lastname}`
    })

    const compiledTemplate = handlebars.compile(authorsView)
    const rendered = compiledTemplate({message: 'Handlebars template', authors})
    docClass.render(domElement, rendered)


}