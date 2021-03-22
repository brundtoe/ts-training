export default function handleJson (customers: JSON) : string {
  // users = JSON.parse(datafile);
  // console.log(users);
  let list = '<tbody data-testid="customers">'
  for (const [key, value] of Object.entries(customers)) {
    list += `<tr id="customer-${key}"><td >${value.id}</td>
                        <td >${value.name} </td>
                        <td >${value.city} </td>
                        <td >${value.state} </td>
                        <td >${value.mail} </td></tr>`
  }
  list += '</tbody>'
  return list
}
