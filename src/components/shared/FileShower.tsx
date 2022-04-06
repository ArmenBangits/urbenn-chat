import React, { useState } from 'react'
import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css'
import { useSelector } from 'react-redux'
import { selectComponentProps } from '../../ducks/appStates'
import downloadURL from '../../helpers/downloadURI'
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
  const [isOpenedImgLightbox, setOpenedImgLightbox] = useState(false)

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
      {isValidImage(file.name) ? (
        <React.Fragment>
          {isOpenedImgLightbox && (
            <Lightbox
              mainSrc={file.source.toString()}
              onCloseRequest={() => setOpenedImgLightbox(false)}
              toolbarButtons={[
                <button
                  key={0}
                  type='button'
                  className='file-shower__download ti-download'
                  onClick={() => downloadURL(file.source.toString())}
                />
              ]}
            >
              <img src={file.source.toString()} alt={file.name} />
            </Lightbox>
          )}

          <img
            src={file.source.toString()}
            alt={file.name}
            onClick={() => setOpenedImgLightbox(true)}
          />
        </React.Fragment>
      ) : (
        <img
          src={`${
            fileExtensionsPath || componentProps.fileExtensionsPath
          }${getFileExtension(file.name)}.svg`}
        />
      )}
    </div>
  )
}

FileShower.defaultProps = {
  showDelete: false
}

export default FileShower
