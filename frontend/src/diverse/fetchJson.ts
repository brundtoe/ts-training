import docClass from "../util/renderHtmlElement.js";
/**
class docClass {
    public render(divId: string, text: string){
        const el: HTMLElement | null = document.getElementById(divId)
        if (el) {
            el.innerHTML = text
        }
    }
}
*/
export default (url: string, domElement: string, handleResponse: any) => {
    fetch(url,{
        headers: {'Accept': 'application/json'}
    })
        .then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                return Promise.reject(response)
            }
        })
        .then(function (data) {
            const list = handleResponse(data)
            docClass.render(domElement,list)
        })
        .catch((error) => {
            const res = `<tr><td>${error.statusText}</td></tr><tr><td>${error.url}</td></tr>`
            docClass.render(domElement,res)
        })
}
