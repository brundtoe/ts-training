import _ from 'lodash'
import {bookstore} from '../assets/data/bookstore'

import docElement from '../util/renderElement'

const ejsTemplate = <HTMLElement>document.getElementById('ejs-template')
ejsTemplate.addEventListener('click', (e) => {

    e.preventDefault()

    const users = bookstore.customers.filter(user => user.id <= 12)
    const tmpl = `<table><tbody data-testid="customers">
        <% _.forEach(users, function(user){ %>
            <tr id="customer-<%= user.id %>" > 
                <td><%= user.id%></td>
                <td><%= user.name%></td>
                <td><%= user.city%></td>
                <td><%= user.state%></td>
                <td><%= user.mail%></td>
            </tr>
        <% }) %>
    </tbody>
    </table>`

    const compiled = _.template(tmpl)
    const html = compiled({users: users})

    docElement.renderHtml('data', `${html}`)
    console.log('DOMContentLoaded', 'page-template')
})
