//import {authorsView} from "../views/eksempler.js";
import docClass from "../util/renderHtmlElement.js";

export default function (handlebars: any, source: string, data: Array<any>, domElement: string) {

    const compiledTemplate = handlebars.compile(source)
    const rendered = compiledTemplate({
        message: 'Handlebars template',
        data: data
    })
    docClass.render(domElement, rendered)


}