export default function epochToDate(epoch) {
  const month = new Date(epoch).getMonth();
  const date = new Date(epoch).getDate();
  const year = new Date(epoch).getFullYear();

  return `${month}/${date}/${year}`;
}
