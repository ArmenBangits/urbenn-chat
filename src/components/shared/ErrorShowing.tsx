import React from 'react'
import { connect } from 'react-redux'
import { ChatState } from '../../types'
import { selectErrorContainer } from './../../ducks/appStates'

interface OpacityLoadingProps {
  name: string
  children: React.ReactChild | React.ReactChild[]
}

interface OpacityLoadingState {
  errorContainerName: string | null
}

const ErrorShowing: React.FC<OpacityLoadingProps & OpacityLoadingState> = ({
  name,
  children,
  errorContainerName
}) => {
  if (errorContainerName === name)
    return (
      <React.Fragment>
        <div className='row text-center justify-content-center'>
          <div className='w-100'>
            <div className='card d-flex align-items-center'>
              <div className='card-body'>
                <div className='d-flex flex-row align-items-center'>
                  <div className='ml-3'>
                    <h6 className='text-youtube'>Что-то пошло не так</h6>
                    <p className='mt-2 text-danger card-text'>
                      Соединение с сервером прервано
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  else return <React.Fragment>{children}</React.Fragment>
}

const mapStateToProps = (state: ChatState) => ({
  errorContainerName: selectErrorContainer(state)
})

export default connect(mapStateToProps)(ErrorShowing)
