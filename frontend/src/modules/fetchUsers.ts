import fetchJson from '../diverse/fetchJson.js';
import handleUsers from '../modules/formaterUsers.js';

document.addEventListener('DOMContentLoaded', function(e){

  const url = `http://localhost:3300/bookstore/users/sample/12`
  fetchJson(url, 'data', handleUsers);

})
