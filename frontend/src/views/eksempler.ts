export const authorsView: string = `<p>Welcome til <strong>{{message}}</strong></p>
<table id="authors" class="table table-sm">
    {{#data}}
        <tr>
        <td>{{this.id}}</td>
        <td>{{this.firstname}}&nbsp;{{this.lastname}}</td>
        <td>{{this.mail}}</td>
        </tr>
    {{/data}}
</table> `