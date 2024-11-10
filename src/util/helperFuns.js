export const convertDateTimeToApplicationTime = (dateFormat) => {
    const date = new Date(dateFormat)
    const formatedYear = date.getFullYear()
    const formatedMonth = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : '' + (date.getMonth() + 1)
    const formatedDay = date.getDate() < 10 ? '0' + date.getDate() : '' + date.getDate()
    const formatedHours = date.getHours() < 10 ? '0' + date.getHours() : '' + date.getHours()
    const formatedMinutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : '' + date.getMinutes()
    const formatedSec = date.getSeconds() < 10 ? '0' + date.getSeconds() : '' + date.getSeconds()
    const formatted_date = `${formatedHours}:${formatedMinutes}:${formatedSec} ${formatedDay}/${formatedMonth}/${formatedYear}`//formatedDay + '/' + formatedMonth + '/' + formatedYear + ' ' + formatedHours + ':' + formatedMinutes
    return formatted_date
  }