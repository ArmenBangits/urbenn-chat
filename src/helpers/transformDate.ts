import moment from 'moment-timezone'

export default function transformDate(date: string): string {
  return moment(date).utc().format('DD.MM.YYYY, HH:mm')
}
