export default function createOutsideClickListener(selector: string) {
  let subscriber: ((e: Event) => void) | null = null

  return {
    subscribe: (cb: () => void) => {
      const outsideClickListener = (subscriber = (event: MouseEvent) => {
        if (!(event.target as HTMLElement).closest(selector)) cb()
      })

      document.addEventListener('click', outsideClickListener)
    },
    unsubscribe: () => {
      if (subscriber) document.removeEventListener('click', subscriber)
    }
  }
}
