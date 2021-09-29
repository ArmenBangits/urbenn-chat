import moment from 'moment-timezone'

function persuadeDate(number: number, textFormats: string[]) {
  number = Math.abs(number) % 100

  const remainderNumber = number % 10

  if (number > 10 && number < 20) return textFormats[2]

  if (remainderNumber > 1 && remainderNumber < 5) return textFormats[1]
  if (remainderNumber === 1) return textFormats[0]

  return textFormats[2]
}

export default function timeDifference(date: string) {
  const [month, day, year, hours, minutes, seconds] = moment(new Date())
    .tz('Europe/Moscow')
    .format('MM-DD-YYYY-HH-mm-ss')
    .split('-')

  const [
    prevMonth,
    prevDay,
    prevYear,
    prevHours,
    prevMinutes,
    prevSeconds
  ] = moment(date).utc().format('MM-DD-YYYY-HH-mm-ss').split('-')

  const current = new Date(
    `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`
  ).getTime()

  let previous = new Date(date).getTime()

  if (date.split('').reverse()[0] === 'Z') {
    previous = new Date(
      `${prevYear}-${prevMonth}-${prevDay}T${prevHours}:${prevMinutes}:${prevSeconds}`
    ).getTime()
  }

  const msPerMinute = 60 * 1000
  const msPerHour = msPerMinute * 60
  const msPerDay = msPerHour * 24

  const elapsed = current - previous

  console.log(elapsed)

  if (elapsed < msPerMinute) return ' Только что'
  else if (elapsed < msPerHour)
    return (
      Math.round(elapsed / msPerMinute) +
      ` ${persuadeDate(Math.round(elapsed / msPerMinute), [
        'минуту',
        'минуты',
        'минут'
      ])} назад`
    )
  else if (elapsed < msPerDay)
    return (
      Math.round(elapsed / msPerHour) +
      ` ${persuadeDate(Math.round(elapsed / msPerHour), [
        'час',
        'часа',
        'часов'
      ])} назад`
    )

  return (
    Math.round(elapsed / msPerDay) +
    ` ${persuadeDate(Math.round(elapsed / msPerDay), [
      'день',
      'дня',
      'дней'
    ])} назад`
  )
}
