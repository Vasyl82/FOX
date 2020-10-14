import React from 'react';
import { CSpinner } from '@coreui/react'

const LoadingSpinner = () => {
  return (
    <div className="pt-3 text-center h-100">
      <CSpinner size="sm" grow style={{ width: '4rem', height: '4rem' }} />
    </div>
  )
}

export default LoadingSpinner