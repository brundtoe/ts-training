import fetchJson from '../modules/fetchJson.js';
import handleUsers from '../modules/formaterUsers.js';

document.addEventListener('DOMContentLoaded', function(e){

  const url = `${window.location.origin}/bookstore/users/sample/12`
  //const url = `http://localhost:3300/bookstore/users/sample/12`;
  fetchJson(url, 'data', handleUsers);

})
