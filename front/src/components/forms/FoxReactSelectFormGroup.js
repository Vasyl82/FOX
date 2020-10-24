import React from 'react'
import Select from 'react-select'
import {
  CFormGroup
} from '@coreui/react'


const makeLabel = (inputString) => {
  return inputString
    .split("_")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

}
const makePlaceholder = inputString => {
  return `Choose ${makeLabel(inputString)}`
}


const getValueFromOptions = (value, options) => {
  if (options) {
    return options.find(option => option.value === value)
  }
}


const customStyles = {

  menuList: (provided, state) => ({
    ...provided,
    position: "relative",
    zIndex: 20,
  }),
  option: (provided, state) => ({
    ...provided,
    position: "relative",
    zIndex: "20",
    color: "#768192"
  }),
  container: (provided, state) => ({
    ...provided,
    position: "relative",
    zIndex: "20"
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: "#768192"
  }),
}

const FoxReactSelectFormGroup = props => {
  return (
    <CFormGroup disabled={props.disabled} >
      <Select
        id={props.inputInfo}
        name={props.inputInfo}
        placeholder={makePlaceholder(props.inputInfo)}
        value={getValueFromOptions(props.inputValue, props.options)}
        onChange={props.handleChange}
        options={props.options}
        styles={customStyles}
        required
      >
      </Select>
    </CFormGroup>
  )
}

export default FoxReactSelectFormGroup
