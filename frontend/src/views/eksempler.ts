export const authorsView: string = `<p>Welcome til <strong>{{message}}</strong></p>
<table id="authors" class="table table-sm">
    {{#data}}
        <tr>
        <td>{{this.id}}</td>
        <td>{{fullname this}}</td>
        <td>{{this.mail}}</td>
        </tr>
    {{/data}}
</table> `