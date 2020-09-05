import 'bootstrap'
import '../scss/index.scss'
import './page.scss'

import _ from 'lodash'
import {bookstore} from '../assets/data/bookstore'

import docElement from '../util/renderElement'


document.addEventListener('DOMContentLoaded', (e) => {

    const users = bookstore.customers.filter(user => user.id <= 12)
    const tmpl = `<% _.forEach(users, function(user){ %>
        <tr> 
            <td><%= user.id%></td>
            <td><%= user.name%></td>
            <td><%= user.city%></td>
            <td><%= user.state%></td>
            <td><%= user.mail%></td>
        </tr>
    <% }) %>`

    const compiled = _.template(tmpl)
    const html = compiled({users: users})

    docElement.renderHtml('data', `${html}`)
    console.log('DOMContentLoaded', 'page-scrap')
    $('#alert').on('click', () => {
        alert('jQuery works!')
    })
})
