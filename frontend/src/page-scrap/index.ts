import 'bootstrap'
import '../scss/index.scss'
import './page.scss'

import _ from 'lodash'

import docElement from '../util/renderElement'

document.addEventListener('DOMContentLoaded', (e) => {
  const users = ['jens','marie','carsten','lone']

  const tmpl = `<% _.forEach(users, function(user){ %>
    <li><%= user %> </li> 
  <% }) %>`

  const compiled = _.template(tmpl)
  const html = compiled( {users: users})

  docElement.renderHtml('data',`<ul>${html}</ul>`)
  console.log('DOMContentLoaded', 'page-scrap')
  $('#alert').on('click', () => {
    alert('jQuery works!')
  })
})
