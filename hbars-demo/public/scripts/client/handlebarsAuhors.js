import docClass from '../util/renderHtmlElement.js';
const authors = [
    {
        author: {
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
    }
];
export default function (handlebars, templateId, domElement) {
    handlebars.registerHelper('fullname', function (author) {
        return `${author.firstname} ${author.lastname}`;
    });
    const el = document.getElementById(templateId);
    if (el) {
        const source = el.innerHTML;
        const compiledTemplate = handlebars.compile(source);
        const rendered = compiledTemplate({ message: 'Handlebars template', authors });
        docClass.render(domElement, rendered);
    }
}
