import docClass from "../util/renderHtmlElement.js";

export async function fetchBackend(url: string) {
    const response = await window.fetch(url)
    const data = await response.json()
    return data
}




