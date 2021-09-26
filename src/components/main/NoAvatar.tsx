import React, { FC } from 'react'
import { UserIcon } from '../../icons'

const NoAvatar: FC<{ sm?: boolean }> = ({ sm = false }) => {
  return (
    <React.Fragment>
      <UserIcon className={`no-avatar ${sm ? 'no-avatar--small' : ''}`} />
    </React.Fragment>
  )
}

export default NoAvatar
