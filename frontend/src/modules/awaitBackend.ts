import docClass from "../util/renderHtmlElement.js";

async function fetchBackend(url: string) {
    const response = await window.fetch(url)
    const data = await response.json()
    return data
}

export async function awaitBackend (url: string, handlebars: any, source: string, domElement: string) {

    handlebars.registerHelper('fullname', function (author: any) {
        return `${author.firstname} ${author.lastname}`
    })
    try {
        const data = await fetchBackend(url)

        const compiledTemplate = handlebars.compile(source)
        const rendered = compiledTemplate({
            message: 'Handlebars template',
            data: data
        })
        docClass.render(domElement, rendered)
    } catch (err) {
        console.log(err)
    }
}



