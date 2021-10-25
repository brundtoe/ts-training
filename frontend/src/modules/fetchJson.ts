export async function fetchJson(url: string) {
    const response = await window.fetch(url,{
        headers: {'Accept': 'application/json'}
    })
    return await response.json()
}




