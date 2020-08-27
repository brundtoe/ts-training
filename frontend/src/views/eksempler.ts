export const authorsView: string = `<p>Welcome til <strong>{{message}}</strong></p>
            <table id="authors" class="table table-sm">
                {{#data}}
                    <tr>
                        <td>{{fullname author}}</td>
                        <td>{{author.mail}}</td>
                    </tr>
                {{/data}}
            </table> `