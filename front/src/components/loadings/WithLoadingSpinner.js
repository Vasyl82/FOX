import React from 'react'
import { CFade } from '@coreui/react'
import LoadingSpinner from './LoadingSpinner'


const WithLoadingSpinner = props => {
  if (props.loading == true) {
    return <LoadingSpinner />
  }
  return (
    <CFade>
      {props.children}
    </CFade>
  )
}

export default WithLoadingSpinner