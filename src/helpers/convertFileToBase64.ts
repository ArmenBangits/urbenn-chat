import { FileUpload } from 'use-file-upload'

const convertFileToBase64 = (file: FileUpload): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file.file)
    reader.onload = (e) => {
      console.log(e.target?.result)

      resolve(reader.result as string)
    }
    reader.onerror = (error) => reject(error)
  })

const convertFilesToBase64 = (files: FileUpload[]): Promise<string[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const filesWithBase64 = await Promise.all(
        files.map((file) => convertFileToBase64(file))
      )

      resolve(filesWithBase64)
    } catch (error) {
      reject(error)
    }
  })
}

export { convertFilesToBase64, convertFileToBase64 }
