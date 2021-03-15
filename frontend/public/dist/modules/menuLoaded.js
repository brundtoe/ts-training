import docClass from '../util/renderHtmlElement.js';
export default function (menu, domElement) {
    window.fetch(menu)
        .then(function (response) {
        if (response.ok) {
            return response.text();
        }
        throw new Error('partial html er ikke indlæst');
    })
        .then(function (result) {
        docClass.render(domElement, result);
    })
        .catch(function (err) {
        console.log(err);
        alert('Filen er ikke indlæst');
    });
}
