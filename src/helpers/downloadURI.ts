export default function downloadURL(url: string) {
  let link: HTMLAnchorElement | null = document.createElement('a')

  link.href = url
  link.setAttribute('target', '_blank')
  link.setAttribute('download', '')

  document.body.appendChild(link)

  link.click()

  document.body.removeChild(link)

  link = null
}
