import docElement from '../util/renderHtmlElement.js'

type authorType = {
    firstname: string,
    lastname: string,
    mail: string
}

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

export default function (handlebars: any, templateId: string, domElement: string) {

    handlebars.registerHelper('fullname', function (author: authorType){
        return `${author.firstname} ${author.lastname}`
    })
    const el = document.getElementById(templateId)
    if (el) {
        const source = el.innerHTML
        const compiledTemplate = handlebars.compile(source)
        const rendered = compiledTemplate({message: 'Handlebars template', authors})
        docElement.renderHtml(domElement, rendered)

    }
}
