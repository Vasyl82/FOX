import React from 'react'
import { CSpinner } from '@coreui/react'

const SubmitSpinner = (props) => {
    return (
        props.submitting ?
            <span className="mr-1">
                <CSpinner size="sm" grow color="dark" />
            </span>
            : null
    )
}

export default SubmitSpinner