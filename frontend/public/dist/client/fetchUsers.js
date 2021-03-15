import { fetchJson } from '../modules/fetchJson.js';
import formaterUsers from '../modules/formaterUsers.js';
import config from '../util/config.js';
import docClass from "../util/renderHtmlElement.js";
document.addEventListener('DOMContentLoaded', function (e) {
    const url = `${config.host_uri}/bookstore/users/sample/12`;
    fetchJson(url).then((data) => {
        const list = formaterUsers(data);
        docClass.render('data', list);
        console.log('hentet og indsat data på siden ');
    }).catch((err) => {
        console.log(err);
    });
});
