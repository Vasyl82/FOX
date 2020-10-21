import React from 'react'

import {
  CFormGroup,
  CRow,
  CCol,
  CLabel,
  CInput,
  CInputFile
} from '@coreui/react'

const makeLabel = inputString => {
  return inputString.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}
const makePlaceholder = inputString => {
  return `Enter ${makeLabel(inputString)} info`
}

const FoxFormGroupWithUpload = props => {
  return (
    <CFormGroup>
      <CRow>
        <CCol md="6">
          {/* <CLabel htmlFor={props.inputInfo}>{makeLabel(props.inputInfo)}</CLabel> */}
          <CInput
            id={props.inputInfo}
            name={props.inputInfo}
            placeholder={makeLabel(props.inputInfo)}
            value={props.inputValue}
            onChange={props.handleChange}
            disabled={props.disabled}
            readOnly={props.readOnly}
            required />
        </CCol>
        <CCol md="6">
          <CLabel htmlFor={props.uploadInfo}>{makeLabel(props.uploadInfo)}</CLabel>
          <CInputFile id={props.uploadInfo} name={props.uploadInfo} onChange={props.handleFileUpload}
            disabled={props.disabled}
            required />
        </CCol>
      </CRow>
    </CFormGroup>
  )
}

export default FoxFormGroupWithUpload