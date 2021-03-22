export const authorsView: string = `<p>Welcome til <strong>{{message}}</strong></p>
<table class="table table-sm">
    <tbody data-testid="authors">
    {{#data}}
        <tr id="author-{{this.id}}">
        <td>{{this.id}}</td>
        <td>{{this.firstname}} {{this.lastname}}</td>
        <td>{{this.mail}}</td>
        </tr>
    {{/data}}
    </tbody>
</table> `