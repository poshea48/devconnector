function convertDateForDisplay(date) {
  const months = ['', 'January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const [year, month, day] = date.split("T")[0].split('-')
  return `${months[Number(month)]} ${year}`
}

export default convertDateForDisplay
