export async function fetchJson(url) {
    const response = await window.fetch(url, {
        headers: { 'Accept': 'application/json' }
    });
    const data = await response.json();
    return data;
}
