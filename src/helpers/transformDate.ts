import moment from 'moment'
import 'moment/locale/ru'

export default function transformDate(
  date: string,
  localization: string
): string {
  const momentLocalization = moment

  momentLocalization.locale(localization)

  return momentLocalization(new Date(date)).format('MMMM Do YYYY, h:mm:ss')
}
