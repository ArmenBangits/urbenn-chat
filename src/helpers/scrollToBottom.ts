export default function scrollToBottom(
  selector: string = '.chat-container-wrapper'
): void {
  if (!selector) return

  const element = document.querySelector(selector)

  if (element) element.scrollTop = element.scrollHeight
}
