export const getFileExtension = (src: string) => {
  return src.split('.').reverse()[0].toLowerCase()
}

export default function isValidImage(src: string): boolean {
  const extension = getFileExtension(src)

  return ['jpg', 'jpeg', 'svg', 'png'].some((ex) => extension === ex)
}
