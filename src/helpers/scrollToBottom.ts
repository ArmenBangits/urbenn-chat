export default function scrollToBottom(
  selector: string = '.chat-container-wrapper'
): void {
  const element = document.querySelector(selector)

  if (element) element.scrollTop = element.scrollHeight
}
