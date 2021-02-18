import moment from 'moment'

export default function transformDate(date: string): string {
  return moment(new Date(date)).format('DD.MM.YYYY, HH:mm')
}
