export const formatDate = val => {
  const newDate = val.value ? new Date(val.value) : new Date()
  let year = newDate.getFullYear()
  let month = newDate.getMonth() + 1
  let day = newDate.getDate()
  let hh = newDate.getHours()
  let mm = newDate.getMinutes()
  let ss = newDate.getSeconds()
  if (month < 10) month = `0${month}`
  if (day < 10) day = `0${day}`
  if (hh < 10) hh = `0${hh}`
  if (mm < 10) mm = `0${mm}`
  if (ss < 10) ss = `0${ss}`
  const conn = val.conn ? val.conn : '-'
  const br = val.br ? '<br />' : ' '
  const date = `${year}${conn}${month}${conn}${day}`
  const time = `${hh}:${mm}:${ss}`
  if (val.type === 'date') {
    return date
  } else if (val.type === 'time') {
    return time
  } else {
    return `${date}${br}${time}`
  }
}
