import docClass from '../util/renderHtmlElement.js'

export default function (menu: string, domElement: string) {
  window.fetch(menu)
    .then(function (response) {
      if (response.ok) {
        return response.text()
      } else {
        throw new Error('partial html er ikke indlæst')
      }
    })
    .then(function (result) {
      docClass.render(domElement, result)
    })
    .catch(function (err) {
      console.log(err)
      alert('Filen er ikke indlæst')
    })

}
