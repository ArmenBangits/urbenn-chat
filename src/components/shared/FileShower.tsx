import React from 'react'
import { useSelector } from 'react-redux'
import { selectComponentProps } from '../../ducks/appStates'
import isValidImage, { getFileExtension } from './../../helpers/isValidImage'

export type FileShower = {
  source: URL
  name: string
}
interface FileShowerProps {
  file: FileShower
  showDelete?: boolean
  onDelete?: () => void
}

const FileShower: React.FC<FileShowerProps> = ({
  file,
  showDelete,
  onDelete
}) => {
  const componentProps = useSelector(selectComponentProps)

  return (
    <div className='file-shower'>
      {showDelete && (
        <button
          className='btn file-shower__delete-btn'
          type='button'
          onClick={onDelete}
        >
          <i className='ti-close icon-sm'></i>
        </button>
      )}
      {/* @ts-ignore */}
      <a target='_blank' href={file.source} download>
        {isValidImage(file.name) ? (
          // @ts-ignore
          <img src={file.source} alt={file.name} />
        ) : (
          <img
            src={`${componentProps.fileExtensionsPath}${getFileExtension(
              file.name
            )}.svg`}
          />
        )}
      </a>
    </div>
  )
}

FileShower.defaultProps = {
  showDelete: false
}

export default FileShower
