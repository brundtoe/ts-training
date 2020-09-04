import 'bootstrap'
import '../scss/index.scss'
import './page.scss'
import config from "../util/config";
import {fetchJson} from "../modules/fetchJson";
import formaterUsers from "../modules/formaterUsers";
import docElement from "../util/renderElement";

document.addEventListener('DOMContentLoaded', (e) => {
  e.preventDefault()
  const url = `${config.host_uri}/bookstore/users/sample/12`
  fetchJson(url).then((data) => {
    const userList = formaterUsers(data)
    docElement.renderHtml('data',userList)
    console.log('hentet og indsat data på siden ')
  }).catch((err) => {
    console.log(err)
  })})
