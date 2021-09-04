export default function debounce<T extends Function>(
  func: T,
  timeout = 300,
  preventDebounce?: (args: any[], prevArgs: any[]) => void
): any {
  let timer: NodeJS.Timeout

  let prevArgs: any[]

  return (...args: any[]) => {
    clearTimeout(timer)

    if (preventDebounce && preventDebounce(args, prevArgs || [])) return

    timer = setTimeout(() => {
      prevArgs = args
      func.apply(null, args)
    }, timeout)
  }
}
