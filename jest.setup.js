function getActualDate() {
  const updated_at = new Date()
  const pad = (n) => String(n).padStart(2, '0');
  return `${updated_at.getFullYear()}-${pad(updated_at.getMonth() + 1)}-${pad(updated_at.getDate())}`;
}
process.env.CREATED_AT="2025-07-29T16:00:00"
process.env.ACTUAL_DATE = getActualDate()
