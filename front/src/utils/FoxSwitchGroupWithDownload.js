import React from 'react'
import {
  CFormGroup,
  CLabel,
  CRow,
  CSwitch,
  CCol,
  CContainer,
  CButton,
  CIcon
} from "@coreui/react";
import HazardousWorkDocListWithDownloads from './HazardousWorkDocListWithDownloads'

const makeLabel = inputString => {
  return inputString.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}

const makeChoiceName = inputString => {
  return inputString.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('_')
}


const FoxSwitchGroupWithDownload = props => {
  return (
    <React.Fragment>
      <div className="mb-2 "><strong>{props.groupLabel}</strong></div>
      {props.options.map((option, idx) => {
        return (
          <CFormGroup className="d-flex align-items-center" key={idx}>
            <CContainer>
              <CRow>
                <CCol lg="1">
                  <CSwitch
                    className='mr-2'
                    id={option}
                    name={option}
                    value={option}
                    shape={'pill'}
                    variant={'3d'}
                    color={'success'}
                    size={"lg"}
                    onChange={props.handleCheck}
                    checked={props.parentState[option]}
                    disabled={props.disabled}
                    readOnly={props.readOnly}
                  />
                </CCol>

                <CCol lg="2">
                  <CLabel variant="checkbox" className="form-check-label" htmlFor={option}>{makeLabel(option)}</CLabel>
                </CCol>
                {props.parentState[option] ?
                  <>
                    <HazardousWorkDocListWithDownloads hazardousWork={makeChoiceName(option)} />
                  </>
                  : null}

              </CRow>
            </CContainer>
          </CFormGroup>
        )
      })}
    </React.Fragment>
  )
}

export default FoxSwitchGroupWithDownload 
