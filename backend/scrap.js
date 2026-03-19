function getActualDate() {
  const updated_at = new Date()
  const pad = (n) => String(n).padStart(2, '0');
  return `${updated_at.getFullYear()}-${pad(updated_at.getMonth() + 1)}-${pad(updated_at.getDate())}`;
}
const dato = getActualDate()
const actual ='2026-03-19 18:01:02'
const modified = actual.slice(0,10)
console.log(modified === dato)
