import fetchJson from '../modules/fetchJson.js';
import handleUsers from '../modules/formaterUsers.js';
import config from '../util/config.js'

document.addEventListener('DOMContentLoaded', function(e){

  const url = `${config.host_uri}/bookstore/users/sample/12`
  fetchJson(url, 'data', handleUsers);

})
