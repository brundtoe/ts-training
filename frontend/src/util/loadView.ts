import docElement from "./renderElement";

export default function (handlebars: any, source: string, data: Array<any>, domElement: string) {

    const compiledTemplate = handlebars.compile(source)
    const rendered = compiledTemplate({
        message: 'Handlebars template',
        data: data
    })
    docElement.renderHtml(domElement, rendered)


}