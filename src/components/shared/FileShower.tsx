import React from 'react'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
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
  fileExtensionsPath?: string
}

const FileShower: React.FC<FileShowerProps> = ({
  file,
  showDelete,
  onDelete,
  fileExtensionsPath
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
          <i className='ti-close icon-sm' />
        </button>
      )}
      {/* @ts-ignore */}
      <a target='_blank' href={file.source} download rel='noreferrer'>
        {isValidImage(file.name) ? (
          <Zoom>
            {/* @ts-ignore */}
            <img src={file.source} alt={file.name} />
          </Zoom>
        ) : (
          <img
            src={`${
              fileExtensionsPath || componentProps.fileExtensionsPath
            }${getFileExtension(file.name)}.svg`}
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
