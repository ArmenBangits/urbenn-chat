import { PAGINATION_LOADING_PIXELS } from '../config'

export default function createScrollToTopListener(element: HTMLElement) {
  let subscriber: ((e: Event) => void) | null = null

  return {
    subscribe: (cb: () => void) => {
      const subscribeForScroll = (subscriber = (e: Event) => {
        if (!e.currentTarget) return

        // @ts-ignore
        if (e.currentTarget.scrollTop < PAGINATION_LOADING_PIXELS) cb()
      })

      element.addEventListener('scroll', subscribeForScroll)
    },
    unsubscribe: () => {
      if (subscriber) element.removeEventListener('scroll', subscriber)
    }
  }
}
